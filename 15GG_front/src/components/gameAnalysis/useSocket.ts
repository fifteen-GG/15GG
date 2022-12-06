import { useState, useEffect } from 'react';
import { gameState } from '../types/enum';

export enum SocketStatus {
  onNewChatReceived = 'onNewChatReceived',
  onConnectionFailed = 'onConnectionFailed',
  onConnectionOpened = 'onConnectionOpened',
}

export const useSocket = (
  onConnectionStateChanged: (state: SocketStatus) => void,
  matchID: any,
  status: gameState,
) => {
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (status === gameState.live) connectStart();

    else if (status === gameState.end)
      onConnectionStateChanged(SocketStatus.onConnectionFailed);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const connectStart = () => {
    const ws = new WebSocket(
      `${process.env.REACT_APP_GG_WS_ROOT}/match/${matchID}`,
    );
    ws.onmessage = e => {
      e.preventDefault();
      const data = e.data;
      setResponseMessage(data);
      onConnectionStateChanged(SocketStatus.onNewChatReceived);
    };
    ws.onopen = () => {
      onConnectionStateChanged(SocketStatus.onConnectionOpened);
    };
    ws.onclose = () => {
      onConnectionStateChanged(SocketStatus.onConnectionFailed);
    };
  };
  return { responseMessage: responseMessage };
};
