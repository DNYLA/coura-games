import { ClientLobby, Games, Player, RPSMove } from '@couragames/shared-types';

//isHost is not needed on the server-side
export type Lobby = Omit<ClientLobby, 'isHost'> & {
  hostId: string;
  type: Games;
  data?: RPSInfo; //This should be redundant (No need to store?)
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
