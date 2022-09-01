import { LobbyEvent, LobbyEvents } from '@couragames/shared-types';
import {
  createLobby,
  joinLobby,
  startGame,
} from 'libs/game-logic/src/lib/game-logic';
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
    default:
      console.log('Unknow');
      break;
  }
}
