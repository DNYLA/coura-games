import { Games, Player, RPSMove } from '@couragames/shared-types';

export type Lobby = {
  id: string;
  hostId: string;
  type: Games;
  players: Player[];
  maxPlayersAllowed: number; //Game cannot handle more than x players
  minPlayers: number; //Game Requires atleast x players before starting
  started: boolean;
  lastActivity: Date;
  settings: LobbySettings;
  data?: RPSInfo; //This should be redundant (No need to store?)
};

export type LobbySettings = {
  randomNames: boolean;
  maxPlayers: number;
};

export type RPSInfo = BaseInfo & {
  round: number;
  playerOneChoice?: RPSMove;
  playerTwoChoice?: RPSMove;
};

type BaseInfo = {
  timer: Date;
};

export enum RPSChoice {
  Rock,
  Paper,
  Scissors,
}
