import { LobbyEvent, LobbyEvents } from '@couragames/shared-types';
import {
  createLobby,
  joinLobby,
  startGame,
} from 'libs/game-logic/src/lib/game-logic';
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

export { redis };
