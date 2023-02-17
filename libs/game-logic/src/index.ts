import {
  Games,
  LobbyEvent,
  LobbyEvents,
  RPSMove,
} from '@couragames/shared-types';
import {
  createLobby,
  joinLobby,
  makeMove,
  restartGame,
  RPSGames,
  startGame,
  ticTacToeGames,
} from './lib/game-logic';
import { TicTacToe } from './lib/tictactoe';
import { Game } from './lib/utils/game';
import { redis } from './lib/utils/redis';
import { Socket } from 'socket.io';
export { createLobby } from './lib/game-logic';

interface SocketData {
  event: LobbyEvent;
}

export function handleLobbyEvent(socket: Socket, event: LobbyEvent) {
  switch (event.type) {
    case LobbyEvents.Create:
      createLobby(socket, event.game);
      break;
    case LobbyEvents.Join:
      joinLobby(socket, event.game, event.id);
      break;
    case LobbyEvents.Start:
      startGame(socket, event.game, event.id);
      break;
    case LobbyEvents.Restart:
      restartGame(socket, event.game, event.id);
      break;
    case LobbyEvents.PlayerMove:
      makeMove(socket, event.game, event.id, event.payload);
      break;
    case LobbyEvents.PlayerLeave:
      throw new Error('Not Implemented');
    case LobbyEvents.Ended:
      throw new Error('Not Implemented');
    default:
      console.log('Unknow');
      break;
  }
}

export function handleGameMove(
  socket: Socket,
  game: Games,
  data: unknown,
  id: string
) {
  switch (game) {
    case Games.RPS:
      const rpsInstance = RPSGames.get(id);
      if (!rpsInstance) return;
      rpsInstance.calculateMove(socket, data as RPSMove);
      break;
    case Games.TicTacToe:
      //Find Game
      const instance = ticTacToeGames.get(id);
      if (!instance) return;
      instance.handleTurn(socket, data as { x: number; y: number });
      break;
  }
}

export function handlePlayAgain(socket: Socket, id: string) {
  const game = ticTacToeGames.get(id);
  if (!game) return;
  game.playAgain(socket);
}

export { redis };
