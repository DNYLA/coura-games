import { SocketIO } from '@couragames/api/services';
import {
  ClientLobby,
  Games,
  Player,
  Socket,
  SocketData,
} from '@couragames/shared-types';
import { RemoteSocket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { getLobby, setLobby } from './redisManager';
import { RPS } from './rps';
import { TicTacToe } from './tictactoe';
import { Game, GamePlayer } from './utils/game';
import { Lobby } from './utils/types';

export const currentGames = new Map<string, Lobby>();
export const ticTacToeGames = new Map<string, TicTacToe>();
export const RPSGames = new Map<string, RPS>();

export async function createLobby(socket: Socket, type: Games) {
  const code = await generateCode();
  const players: Player[] = [
    {
      id: socket.id,
      username: socket.data.username,
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
  const newPlayer: Player = {
    id: socket.id,
    username: socket.data.username,
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
  const players = validatePlayers(lobby.id);
  switch (type) {
    case Games.RPS: {
      const rps = new RPS(lobby, socket);
      RPSGames.set(lobby.id, rps);
      break;
    }
    case Games.TicTacToe: {
      const ticTacToe = new TicTacToe(lobby, socket, players);
      ticTacToeGames.set(lobby.id, ticTacToe);
      break;
    }
    default:
      console.log('Unknown Game');
  }
}

async function validatePlayers(id: string) {
  const sockets = await SocketIO.server.in(id).fetchSockets();

  console.log(sockets);
  const players: Socket[] = [];
  sockets.map((sock: RemoteSocket<DefaultEventsMap, SocketData>) => {
    const validSocket = SocketIO.server.sockets.sockets.get(sock.id) as Socket;
    if (!validSocket) {
      //Handle Disconnection
      return;
    }

    players.push(validSocket);
  });

  return players;
}

export async function restartGame(socket: Socket, type: Games, id: string) {
  const lobby: Lobby = await getLobby(id);
  const game = getGame(type, id);
  if (!lobby || !game) return;

  game.restartGame(socket);
}

export async function makeMove(
  socket: Socket,
  type: Games,
  id: string,
  data: unknown
) {
  const lobby: Lobby = await getLobby(id);
  const game = getGame(type, id);
  if (!lobby || !game) return;

  game.handleTurn(socket, data);
}

function getGame(type: Games, id: string): Game {
  switch (type) {
    case Games.RPS:
      return RPSGames.get(id);
    case Games.TicTacToe:
      return ticTacToeGames.get(id);
    default:
      return null;
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
