import { GameType } from '@prisma/client';
import { Games } from './sockets';

export type GameInfo = {
  name: string;
  shortName?: string;
  redirect: string;
};

export type StatInfo = {
  displayText: string;
  value: number;
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

export function getGameNameFromType(type: GameType): GameInfo {
  switch (type) {
    case GameType.TicTacToe:
      return {
        name: 'Tic-Tac-Toe',
        shortName: 'TicTacToe',
        redirect: 'tic-tac-toe',
      };
    case GameType.RPS:
      return {
        name: 'Rock, Paper, Scissors',
        shortName: 'RPS',
        redirect: 'rock-paper-scissors',
      };
  }
}

export function ConvertStats(stats: object): StatInfo[] {
  if (!stats) return [];

  const statArray: StatInfo[] = [];
  Object.keys(stats).map((stat) =>
    statArray.push({
      displayText: stat,
      value: stats[stat as keyof typeof stats] as number,
    })
  );

  statArray.sort((a, b) => b.value - a.value);

  return statArray;
}
