import { handleLobbyEvent } from '@couragames/game-logic';
import { Games, LobbyEvent } from 'libs/shared-types/src';
import { Server, Socket } from 'socket.io';

export const socketEventHandler = (io: Server) => {
  return io.on('connection', (socket) => {
    socket.on('lobby', (data: LobbyEvent) => {
      handleLobbyEvent(socket, data);
    });
  });
};
