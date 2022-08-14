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
    id: code,
    maxPlayers: 2,
    players,
    started: false,
    lastActivity: game.lastActivity,
  });
  socket.join(code);
}

export function joinLobby(socket: Socket, type: Games, id: string) {
  const lobby = currentGames.get(id);
  if (!lobby)
    return socket.emit('join_lobby', {
      invalid: true,
      reason: 'Lobby does not exist.',
    });

  if (lobby.players.length + 1 > lobby.maxPlayers) {
    return socket.emit('join_lobby', {
      invalid: true,
      reason: 'Lobby has reached maximum player limit.',
    });
  }

  //Add player to playersList
  const randomNumber = generateCode();
  const newPlayer: Player = {
    id: socket.id,
    username: `Guest-${randomNumber}`,
    points: 0,
    lastActivity: new Date(),
  };
  lobby.players.push(newPlayer);

  console.log('Valid Lobby');
  socket.emit('join_lobby', {
    id: lobby.id,
    maxPlayers: 2,
    players: lobby.players,
    started: false,
    lastActivity: lobby.lastActivity,
  });

  socket.to(lobby.id).emit('player_joined', newPlayer);
  socket.join(lobby.id);
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
