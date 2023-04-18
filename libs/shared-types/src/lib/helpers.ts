import { Games } from './sockets';

export type GameInfo = {
  name: string;
  shortName?: string;
  redirect: string;
};

export function getGameInfoFromType(type: Games): GameInfo {
  switch (type) {
    case Games.TicTacToe:
      return {
        name: 'Tic-Tac-Toe',
        shortName: 'TicTacToe',
        redirect: 'tic-tac-toe',
      };
    case Games.RPS:
      return {
        name: 'Rock, Paper, Scissors',
        shortName: 'RPS',
        redirect: 'rock-paper-scissors',
      };
  }
}
