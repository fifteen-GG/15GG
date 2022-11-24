import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTimer } from 'use-timer';
import webClient from '../../../WebClient';
import {
  DataCodeContainer,
  DataCodeWrapper,
  SingleDataCode,
  Footer,
  FooterContent,
  RefreshButton,
} from '../styles/datacode.s';
import { useSocket, SocketStatus } from '../useSocket';
import { useNavigate } from 'react-router-dom';

export const Datacode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(['0', '0', '0', '0', '0', '0']);
  const [codeExpired, setCodeExpired] = useState<number>(0);
  const [refresh, setRefresh] = useState<number>(0);
  //useTimer library
  const { time, start, reset, status } = useTimer({
    initialTime: 5 * 60,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  const getNewCode = async () => {
    try {
      const value = await webClient.get('/code');

      console.log(value);
      if (value.status === 200) {
        setCode(value.data.value.split(''));
        // 소켓 열기
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { responseMessage } = useSocket(state => {
    if (state === SocketStatus.onNewChatReceived) {
      console.log('onNewMessageReceived');
    } else if (state === SocketStatus.onConnectionFailed) {
      console.error('onConnectionFailed');
    } else if (state === SocketStatus.onConnectionOpened) {
      console.log('onConnectionOpened');
    }
  }, code.join(''));

  useEffect(() => {
    console.log(responseMessage);
    if (responseMessage) navigate(`/live?match%ID=${responseMessage}`);
  }, [responseMessage, code]);

  // for development environment
  const validateCode = async (code: string) => {
    try {
      const value = await webClient.get(`/code/validate?value=${code}`);

      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (refresh !== 0 && time >= 280) {
      alert('시러잉');
      return;
    }
    getNewCode();
    reset();
    start();

    // for development environment
    if (code.join('') !== '000000') {
      validateCode(code.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeExpired, refresh]);

  useEffect(() => {
    if (status === 'STOPPED' && time === 0) {
      setCodeExpired(data => data + 1);
    }
  }, [status, time]);

  return (
    <DataCodeContainer>
      <DataCodeWrapper>
        {code.map((value: string, index: number) => {
          return <SingleDataCode key={index}>{value}</SingleDataCode>;
        })}
      </DataCodeWrapper>
      <Footer>
        <FooterContent>
          남은시간 {Math.trunc(time / 60)}:
          {Math.trunc(time % 60) < 10
            ? '0' + Math.trunc(time % 60)
            : Math.trunc(time % 60)}
          {' ·'}
        </FooterContent>
        <RefreshButton onClick={() => setRefresh(data => data + 1)}>
          재생성
        </RefreshButton>
      </Footer>
    </DataCodeContainer>
  );
};
