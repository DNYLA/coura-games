import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketContextType = {
  socket: Socket;
};

const SocketContext = createContext<SocketContextType>({
  socket: undefined,
});

export default SocketContext;
