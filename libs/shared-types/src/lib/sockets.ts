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
  event: LobbyEvents;
};
