import { Games, LobbyEvent, LobbyEvents } from '@couragames/shared-types';
import {
  createLobby,
  joinLobby,
  startGame,
  ticTacToeGames,
} from 'libs/game-logic/src/lib/game-logic';
import { TicTacToe } from 'libs/game-logic/src/lib/tictactoe';
import { Game } from 'libs/game-logic/src/lib/utils/game';
import { redis } from 'libs/game-logic/src/lib/utils/redis';
import { Socket } from 'socket.io';
export { createLobby } from './lib/game-logic';

interface SocketData {
  name: string;
  age: number;
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
      console.log('RPS');
      break;
    case Games.TicTacToe:
      //Find Game
      const game = ticTacToeGames.get(id);
      if (!game) return;
      game.handleTurn(socket, data as { x: number; y: number });
      break;
  }
}

export function handlePlayAgain(socket: Socket, id: string) {
  const game = ticTacToeGames.get(id);
  if (!game) return;
  game.playAgain(socket);
}

export { redis };
