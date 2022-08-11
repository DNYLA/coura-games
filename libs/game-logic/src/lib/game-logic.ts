import { Games, Player } from '@couragames/shared-types';
import { Socket } from 'socket.io';
import { Lobby } from '../types';

const currentGames = new Map<string, Lobby>();

export function createLobby(socket: Socket, type: Games) {
  const code = generateCode();
  const randomNumber = generateCode();
  const players: Player[] = [
    {
      id: socket.id,
      username: `Guest-${randomNumber}`,
      points: 0,
      lastActivity: new Date(),
    },
  ];

  const game: Lobby = {
    id: code,
    hostId: socket.id,
    type,
    players,
    maxPlayers: 2,
    started: false,
    lastActivity: new Date(),
  };

  currentGames.set(code, game);
  socket.data.gameId = code;

  socket.emit('lobby_info', {
    code,
    maxPlayers: 2,
    players: [],
    started: false,
    lastActivity: game.lastActivity,
  });
  socket.join(code);
}

export function joinLobby(socket: Socket, type: Games, id: string) {
  console.log(type);
  console.log(id);
  const lobby = currentGames.get(id);

  if (!lobby) {
    socket.emit('join_lobby', { valid: false });
    return;
  }

  socket.emit('join_lobby', {valid: true,  })
}

function generateCode() {
  //Find a way to generate a string that start with 0
  const code = String(Math.floor(Math.random() * 90000) + 10000);

  //Check if GameCode Already Exists
  // const exists = await getLobby(code);
  // if (!exists) return code;
  // else return generateCode();

  return code;
}
