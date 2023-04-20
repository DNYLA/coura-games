import { PublicUser } from './user';
import { Socket as Sock } from 'socket.io';

export enum Games {
  RPS,
  TicTacToe,
}

export enum LobbyEvents {
  Create,
  Join,
  Start,
  PlayerLeave,
  PlayerMove,
  Ended,
  Restart,
}

export type LobbyEvent = {
  id?: string;
  game: Games;
  type: LobbyEvents;
  payload?: unknown;
};

export type Player = {
  id: string;
  username: string;
  points: 0;
  lastActivity: Date;
};

export type ClientLobby = {
  id: string;
  maxPlayersAllowed: number;
  minPlayers: number;
  players: Player[];
  started: boolean;
  lastActivity: Date;
  isHost?: boolean;
  settings: LobbySettings;
};

export type LobbySettings = {
  randomNames: boolean;
  maxPlayers: number;
};

export type RPSRoundInfo = {
  p1: { score: number; name: string };
  p2: { score: number; name: string };
  totalRounds: number;
  currentRound: number;
  timer: number;
};

export type RPSWinner = {
  p1: { move: RPSMove; name: string };
  p2: { move: RPSMove; name: string };
  winner?: boolean;
};

export enum RPSMove {
  Rock,
  Paper,
  Scissors,
}

export type RPSInfo = {
  P1Move: RPSMove;
};

export type TicTacToeInfo = {
  p1Score: number; //Player One Is Always the host
  p2Score: number;
  draws: number;
  isCrosses: boolean;
  board: number[][];
  timer: number;
};

export interface SocketData {
  username: string;
  gameId?: string;
  user?: PublicUser;
}

export interface Socket extends Sock {
  data: SocketData;
}
