import json
import asyncio
import websockets


async def nashor_client():
    uri = "ws://localhost:8000/api/v1/socket/analyze"
    with open('../app/assets/sample_live_result.json', encoding='UTF-8') as f:
        data = json.load(f)
        async with websockets.connect(uri) as websocket:
            index = 0, 0
            await websocket.send('KR-0000000000')
            while True:
                index += 1
                await asyncio.sleep(1)
                try:
                    # if int(data[index]['timestamp']) == timestamp:
                    await websocket.send(json.dumps(
                        {**data[index]}, ensure_ascii=False))
                    # res = await websocket.recv()
                    # print(res[20:40])
                except IndexError:
                    await websocket('Game ended')

asyncio.get_event_loop().run_until_complete(nashor_client())
