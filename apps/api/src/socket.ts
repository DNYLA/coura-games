import { handleLobbyEvent } from '@couragames/game-logic';
import { Games, LobbyEvent, RPSMove } from 'libs/shared-types/src';
import { Server, Socket } from 'socket.io';

export const socketEventHandler = (io: Server) => {
  return io.on('connection', (socket) => {
    socket.on('lobby', (data: LobbyEvent) => {
      handleLobbyEvent(socket, data);
    });

    //This event SHOULD be added whenever a player/socket enters a
    //RPS game not when the socket is initialised.
    socket.on('rps_move', (data: RPSMove) => {
      // RPS
    });
  });
};
