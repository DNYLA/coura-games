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
