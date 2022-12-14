import { Games } from '@couragames/shared-types';

function getDisplayName(game: Games) {
  switch (game) {
    case Games.RPS:
      return 'Rock Paper Scissors';
    case Games.TicTacToe:
      return 'Tic Tac Toe';

    // default: {return "Invalid"}
  }
}

export { getDisplayName };
