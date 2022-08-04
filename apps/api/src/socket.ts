import { Games, LobbyEvent } from 'libs/shared-types/src';
import { Server } from 'socket.io';

export const socketEventHandler = (io: Server) => {
  return io.on('connection', (socket) => {
    socket.on('lobby', (data: LobbyEvent) => {
      console.log(data);
    });
  });
};
