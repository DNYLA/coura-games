import {
  handleGameMove,
  handleLobbyEvent,
  handlePlayAgain,
} from '@couragames/game-logic';
import { Games, LobbyEvent, RPSMove } from 'libs/shared-types/src';
import { Server, Socket } from 'socket.io';

export const socketEventHandler = (io: Server) => {
  return io.on('connection', (socket) => {
    socket.on('lobby', (data: LobbyEvent) => {
      handleLobbyEvent(socket, data);
    });

    //This event SHOULD be added whenever a player/socket enters a
    //RPS game not when the socket is initialised.
    socket.on('rps_move', (data: { id: string; move: RPSMove }) => {
      // RPS
      handleGameMove(socket, Games.RPS, data.move, data.id);
    });

    socket.on(
      'tictactoe_move',
      (data: { id: string; x: number; y: number }) => {
        handleGameMove(socket, Games.TicTacToe, data, data.id);
      }
    );

    socket.on('tictactoe_playagain', (data: { id: string }) => {
      handlePlayAgain(socket, data.id);
    });
  });
};
