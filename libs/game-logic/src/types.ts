import { Games, Player } from '@couragames/shared-types';

export type Lobby = {
  id: string;
  hostId: string;
  type: Games;
  players: Player[];
  maxPlayers: number;
  minPlayers: number;
  started: boolean;
  lastActivity: Date;
  data?: RPSInfo; //This should be redundant (No need to store?)
};

export type RPSInfo = BaseInfo & {
  round: number;
  playerOneChoice?: RPSChoice;
  playerTwoChoice?: RPSChoice;
};

type BaseInfo = {
  timer: Date;
};

export enum RPSChoice {
  Rock,
  Paper,
  Scissors,
}
