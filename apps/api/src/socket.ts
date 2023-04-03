import { SocketService } from '@couragames/api/services';
import {
  handleGameMove,
  handleLobbyEvent,
  handlePlayAgain,
} from '@couragames/game-logic';
import {
  Games,
  LobbyEvent,
  RPSMove,
  Socket,
  SocketData,
} from '@couragames/shared-types';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const socketEventHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SocketData>
) => {
  return io.on('connection', (socket: Socket) => {
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

    socket.on('request_friend_data', () => {
      SocketService.getFriendsList(socket);
    });

    socket.on(
      'submit_chat_message',
      (data: { targetUser: string; content: string }) => {
        SocketService.processMessage(socket, data.targetUser, data.content);
      }
    );
  });
};
