import { ClientLobby, Games, Player } from '@couragames/shared-types';
import { getLobby, setLobby } from 'libs/game-logic/src/lib/redisManager';
import { main } from 'libs/game-logic/src/lib/rps';
import { redis } from 'libs/game-logic/src/redis';
import { Socket } from 'socket.io';
import { Lobby } from '../types';

export const currentGames = new Map<string, Lobby>();

export async function createLobby(socket: Socket, type: Games) {
  const code = await generateCode();
  const randomNumber = await generateCode();
  const players: Player[] = [
    {
      id: socket.id,
      username: `Guest-${randomNumber}`,
      points: 0,
      lastActivity: new Date(),
    },
  ];

  //Move this into config variable
  const maxPlayers = 2;
  const minPlayers = 2;

  const game: Lobby = {
    id: code,
    hostId: socket.id,
    type,
    players,
    maxPlayersAllowed: maxPlayers,
    minPlayers: minPlayers,
    started: false,
    lastActivity: new Date(),
    settings: {
      randomNames: false,
      maxPlayers,
    },
  };

  await setLobby(code, game, { expire: 60 * 30 });
  socket.data.gameId = code;

  socket.emit('lobby_info', stripLobby(game));
  socket.join(code);
}

export async function joinLobby(socket: Socket, type: Games, id: string) {
  const lobby: Lobby = await getLobby(id);
  if (!lobby)
    return socket.emit('join_lobby', {
      invalid: true,
      reason: 'Lobby does not exist.',
    });

  if (lobby.players.length + 1 > lobby.settings.maxPlayers) {
    return socket.emit('join_lobby', {
      invalid: true,
      reason: 'Lobby has reached maximum player limit.',
    });
  }

  //Add player to playersList
  const randomNumber = await generateCode();
  const newPlayer: Player = {
    id: socket.id,
    username: `Guest-${randomNumber}`,
    points: 0,
    lastActivity: new Date(),
  };
  lobby.players.push(newPlayer);
  setLobby(id, lobby);

  socket.emit('join_lobby', stripLobby(lobby));
  socket.to(lobby.id).emit('player_joined', newPlayer);
  socket.join(lobby.id);
}

export async function startGame(socket: Socket, type: Games, id: string) {
  const lobby: Lobby = await getLobby(id);

  if (!lobby || socket.id !== lobby.hostId || lobby.started) return; //Lobby Doesnt Exist || Invalid Permissions || Already Started

  //Send back message as acknlowedgement later. (Probably not needed as the button shouldnt be shown client side unless they can start)
  if (lobby.players.length !== lobby.minPlayers) return;
  setLobby(id, { ...lobby, started: true });

  socket.to(lobby.id).emit('game_started');
  socket.emit('game_started');

  if (type === Games.RPS) {
    main(lobby, socket);
  }
}

async function generateCode() {
  //Find a way to generate a string that start with 0
  const code = String(Math.floor(Math.random() * 90000) + 10000);

  //Check if GameCode Already Exists
  const exists = await getLobby(code);
  if (!exists) return code;
  else return generateCode();
}

function stripLobby(lobby: Lobby): ClientLobby {
  const clientLobby: ClientLobby = {
    id: lobby.id,
    maxPlayersAllowed: lobby.maxPlayersAllowed,
    minPlayers: lobby.minPlayers,
    players: lobby.players,
    started: lobby.started,
    lastActivity: lobby.lastActivity,
    settings: {
      randomNames: false,
      maxPlayers: lobby.maxPlayersAllowed,
    },
  };

  return clientLobby;
}
