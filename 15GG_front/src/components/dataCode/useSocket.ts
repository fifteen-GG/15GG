import { useState, useEffect } from 'react';

export enum SocketStatus {
  onNewChatReceived = 'onNewChatReceived',
  onConnectionFailed = 'onConnectionFailed',
  onConnectionOpened = 'onConnectionOpened',
}

export const useSocket = (
  onConnectionStateChanged: (state: SocketStatus) => void,
  code: string,
) => {
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (code !== '000000') {
      connectStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const connectStart = () => {
    const ws = new WebSocket(
      `${process.env.REACT_APP_GG_WS_ROOT + `/wait/${code}`}`,
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
