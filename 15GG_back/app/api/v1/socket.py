import asyncio
import json
import random
import functools
import aio_pika
import aio_pika.abc
import torch
import numpy as np
from fastapi import APIRouter, WebSocket
from starlette.websockets import WebSocketDisconnect, WebSocketState

from app import crud
from app.database.session import SessionLocal
from app.core import settings
import os
import boto3
from app.core.config import settings
import time

router = APIRouter()


def s3_connection():
    try:
        s3 = boto3.client(
            service_name="s3",
            region_name="ap-northeast-2",
            aws_access_key_id=settings.AWS_ACCESS_KEY,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return s3


s3 = s3_connection()


async def block_io(websocket: WebSocket):
    _ = await websocket.receive_text()


async def on_message(message: aio_pika.IncomingMessage, websocket: WebSocket):
    async with message.process():
        if message.body == b'Game ended':
            await websocket.send_text('Game ended')
            await websocket.close()
        else:
            await websocket.send_json(json.loads(
                message.body.decode('UTF-8').replace("'", "\"")))


def format_live_match_data(raw_data):
    match_data = {}

    lanes = {
        'top': 0,
        'jungle': 1,
        'middle': 2,
        'bottom': 3,
        'utility': 4
    }
    columns = ['level', 'kills', 'deaths', 'assists', 'gold']

    for lane in lanes:
        for column in columns:
            match_data[f'{lane}_{column}_diff'] = raw_data['player_data'][lanes[lane]
                                                                          ][column] - raw_data['player_data'][lanes[lane] + 5][column]
    return match_data


async def analyze(
        websocket: WebSocket, exchange: aio_pika.Exchange,
        match_id: str, result: dict,
        gg_model, windowed_data):
    try:
        new_data: dict = await websocket.receive_json()
    except:
        with open(f'./{match_id}.json', 'w', encoding='utf-8') as file:
            json.dump(result, file, indent="\t")
        try:
            s3.upload_file(f"./{match_id}.json", "15gg", f"{match_id}.json")
        except Exception as e:
            print(e)
        os.remove(f'./{match_id}.json')

        response = aio_pika.Message(b'Game ended', content_encoding='UTF-8')
        await exchange.publish(message=response, routing_key=match_id)
        raise WebSocketDisconnect

    formatted_data = np.array(
        list(format_live_match_data(new_data).values())).astype(np.float64).reshape(1, 25)
    formatted_data[:, 0::5] /= 5
    formatted_data[:, 1::5] /= 10
    formatted_data[:, 2::5] /= 10
    formatted_data[:, 3::5] /= 10
    formatted_data[:, 4::5] /= 5000

    if len(windowed_data['data']) == 0:
        windowed_data['data'] = np.repeat(
            formatted_data,
            40,
            axis=0)
    elif len(result['match_data']) % 4 == 0:
        windowed_data['data'] = np.concatenate(
            (windowed_data['data'][1:, :], formatted_data), axis=0)

    new_data['blue_team_win_rate'] = gg_model(
        torch.FloatTensor(windowed_data['data'].reshape(1, 40, 25)))[:, 1].item()

    result['match_data'].append(new_data)
    response = bytes(json.dumps(result, ensure_ascii=False), 'UTF-8')
    response = aio_pika.Message(
        response, content_encoding='UTF-8')
    await exchange.publish(message=response, routing_key=match_id)


@router.websocket('/analyze')
async def analyze_game(websocket: WebSocket):
    '''
    Websocket endpoint for analyzing game.
    When a DataNashor client connects to this endpoint,
    it will create a new exchange and bind it to the match_id.

    All the match data parsed from DataNashor will be passed to the AI model,
    the the result will be broadcasted to the clients connected.
    '''
    await websocket.accept()
    try:
        match_id = await websocket.receive_text()
        result = {'match_id': match_id, 'match_data': []}
        connection = await aio_pika.connect(settings.AMQP_HOST)
        channel = await connection.channel()
        exchange = await channel.declare_exchange(
            name='game_logs', type='direct')
        gg_model = torch.jit.load('./app/assets/gg_model_v1.pt')
        windowed_data = {'data': np.array([])}
        while True:
            producer_task = asyncio.create_task(
                analyze(websocket, exchange, match_id, result, gg_model, windowed_data))
            done, pending = await asyncio.wait(
                {producer_task},
                return_when=asyncio.FIRST_COMPLETED,
            )
            for task in pending:
                task.cancel()
            for task in done:
                task.result()

    except WebSocketDisconnect:
        await connection.close()
        await channel.close()
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close()


@router.websocket('/match/{match_id}')
async def get_match_data(websocket: WebSocket, match_id: str):
    '''
    Websocket endpoint for getting match data.
    It will listen to the brodacast messages of match data
    from the exchange bound to the match_id.
    '''
    await websocket.accept()
    try:
        connection = await aio_pika.connect(settings.AMQP_HOST)
        channel = await connection.channel()
        exchange = await channel.declare_exchange(
            name='game_logs', type='direct')
        queue = await channel.declare_queue(name='', exclusive=True)
        await queue.bind(exchange, routing_key=match_id)

        while True:
            consume = queue.consume(functools.partial(
                on_message, websocket=websocket))

            block_io_task = asyncio.create_task(block_io(websocket))
            consumer_task = asyncio.create_task(consume)

            done, pending = await asyncio.wait(
                {block_io_task, consumer_task},
                return_when=asyncio.FIRST_COMPLETED,
            )
            for task in pending:
                task.cancel()
            for task in done:
                task.result()
    except WebSocketDisconnect:
        await connection.close()
        await channel.close()
        await queue.unbind(exchange, routing_key=match_id)
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close()


async def validate_code(websocket: WebSocket, db, code: str):
    code_obj = crud.code.get(db, code)

    if code_obj is None:
        await websocket.send_text('Invalid code')
        raise WebSocketDisconnect
    elif code_obj.match_id != None:
        await websocket.send_text(code_obj.match_id)
        crud.code.remove(db, model_id=code)
        raise WebSocketDisconnect


@router.websocket('/wait/{code}')
async def wait_analyis(websocket: WebSocket, code: str):
    '''
    Websocket endpoint that waits for a match analysis to start.
    '''
    await websocket.accept()
    try:
        while True:
            db = SessionLocal()
            await asyncio.sleep(1)
            block_io_task = asyncio.create_task(block_io(websocket))
            validate_code_task = asyncio.create_task(
                validate_code(websocket, db, code))
            done, pending = await asyncio.wait(
                {validate_code_task, block_io_task},
                return_when=asyncio.FIRST_COMPLETED,
            )
            for task in pending:
                task.cancel()
            for task in done:
                task.result()
    except WebSocketDisconnect:
        db.close()
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close()


async def send_test_result(websocket: WebSocket):
    with open('./app/assets/sample_live_result.json', encoding='UTF-8') as file:
        data = json.load(file)
        index = 0
        result = {'match_id': 'test', 'match_data': []}
        while True:
            await asyncio.sleep(1)
            try:
                result['match_data'].append({**data[index],
                                             'blue_team_win_rate': round(random.uniform(0, 1), 3)})
                await websocket.send_json(result)
                index += 1
            except IndexError:
                await websocket.send_text('Game ended')


@router.websocket('/test')
async def test_client_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # echo_message_task = asyncio.create_task(echo_message(websocket))
            send_time_task = asyncio.create_task(send_test_result(websocket))
            done, pending = await asyncio.wait(
                {send_time_task},
                return_when=asyncio.FIRST_COMPLETED,
            )
            for task in pending:
                task.cancel()
            for task in done:
                task.result()
    except WebSocketDisconnect:
        await websocket.close()
