export enum Games {
  RPS,
}

export enum LobbyEvents {
  Create,
  Join,
  Start,
  PlayerLeave,
  Ended,
}

export type LobbyEvent = {
  id?: string;
  game: Games;
  type: LobbyEvents;
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
  p1Score: number;
  p2Score: number;
  totalRounds: number;
  currentRound: number;
  timer: number;
};

export type RPSWinner = {
  p1Move: RPSMove;
  p2Move: RPSMove;
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
