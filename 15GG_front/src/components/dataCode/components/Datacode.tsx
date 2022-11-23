import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTimer } from 'use-timer';
import {
  DataCodeContainer,
  DataCodeWrapper,
  SingleDataCode,
  Footer,
  FooterContent,
  RefreshButton,
} from '../styles/datacode.s';

export const Datacode = () => {
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
      const value = await axios.get(
        `${process.env.REACT_APP_GG_API_ROOT}/code`,
      );
      console.log(value);
      if (value.status === 200) {
        setCode(value.data.value.split(''));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // for development environment
  const validateCode = async (code: string) => {
    try {
      const value = await axios.get(
        `${process.env.REACT_APP_GG_API_ROOT}/code/validate?value=${code}`,
      );
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
