export enum Games {
  RPS,
}

export enum LobbyEvents {
  Create,
  Join,
  Start,
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
  maxPlayers: number;
  players: Player[];
  started: boolean;
  lastActivity: Date;
  isHost?: boolean;
};
