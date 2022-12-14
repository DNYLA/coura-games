import { setLobby } from 'libs/game-logic/src/lib/redisManager';
import { Game } from 'libs/game-logic/src/lib/utils/game';
import { Lobby } from 'libs/game-logic/src/lib/utils/types';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

// export function main(lobby: Lobby, host: Socket) {
//   const d = new Date();
//   d.setSeconds(d.getSeconds() + MAX_ROUND_TIME);

//   //Call Timeout
//   setTimeout(
//     () => roundEndedCallback(host, lobby.id, 0),
//     MAX_ROUND_TIME * 1000
//   );

//   //Send Current Info
//   lobby.data = { round: 0, timer: d };
//   const roundInfo: RPSRoundInfo = {
//     p1Score: lobby.players[0].points,
//     p2Score: lobby.players[1].points,
//     totalRounds: 0,
//     currentRound: 0,
//     timer: d.getTime(),
//   };

//   host.to(lobby.id).emit('rps_round_started', roundInfo);
//   host.emit('rps_round_started', roundInfo);
//   lobby.started = true; //Game is now live
// }

export class TicTacToe extends Game {
  isPlayerOneTurn = true;
  isPlayerOneCrosses = true;
  private gameEnded = false;
  playerOneRestart = false;
  playerTwoRestart = false;
  //Value of
  // 0 == Empty Slot
  // 1 == Crosses
  // 2 == Naughts
  board = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0));

  constructor(lobby: Lobby, host: Socket) {
    super(lobby, host);

    //Once Initialisation is done we can change other varialbes
  }

  init(): void {
    this.playerOneRestart = false;
    this.playerTwoRestart = false;
    this.gameEnded = false;

    this.board = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => 0)
    );

    //Randomise Whos first
    const isPlayerOneFirst = Math.floor(Math.random() * 2);

    if (isPlayerOneFirst) {
      this.isPlayerOneTurn = true;
      this.isPlayerOneCrosses = true;
    } else {
      this.isPlayerOneTurn = false;
      this.isPlayerOneCrosses = false;
    }

    //This is better than having to set Info to 0 every move on client side as thats an
    //extra client side call whereas this is one per restart
    this.broadcast('tictactoe_replay', 0);
  }

  async roundEnded(round: number) {
    if (!(await this.validLobby())) return;
    if (this.lobby.data.round !== round) return; //Invalid Round Number
  }

  nextRound(round: number): void {
    throw new Error('Method not implemented.');
  }

  emitNewRoundData(timer: Date) {
    this.lobby.data = { round: 0, timer };

    const roundInfo: any = {
      board: this.board,
      timer: timer.getTime(),
    };
    this.broadcast('tictac_nextround', roundInfo);
    // this.host.to(this.lobby.id).emit('tictac_nextround', roundInfo);
    // this.host.emit('tictac_nextround', roundInfo);
    this.lobby.started = true; //Game is now live (Sometimes this will already be set to true)
    setLobby(this.lobby.id, this.lobby);
  }

  handleTurn(socket: Socket, data: { x: number; y: number }): void {
    if (this.gameEnded) return;
    const { x, y } = data;

    const setMove = (value: number) => {
      if (this.board[x][y] !== 0) {
        socket.emit('game_message', 'This position has already been selected!');
        return false;
      }

      this.board[x][y] = value;
      return true;
    };

    const isPlayerOne =
      this.lobby.players.findIndex((player) => player.id === socket.id) === 0
        ? true
        : false;
    if (isPlayerOne && this.isPlayerOneTurn) {
      const newValue = this.isPlayerOneCrosses ? 1 : 2;
      if (!setMove(newValue)) return;
    } else if (!isPlayerOne && !this.isPlayerOneTurn) {
      const newValue = this.isPlayerOneCrosses ? 2 : 1;
      if (!setMove(newValue)) return;
    } else {
      //Send back Not Your Turn
      socket.emit('game_message', 'Not Your Turn to Move!');
      return;
    }

    this.isPlayerOneTurn = !this.isPlayerOneTurn;
    const curResult = this.checkWinner();
    if (curResult >= 1) {
      this.gameEnded = true;
      const winner = curResult === 2 ? socket.id : 'draw';
      this.broadcast('tictac_gameended', {
        board: this.board,
        winner,
      });
    } else {
      const d = new Date();
      d.setSeconds(d.getSeconds() + this.MAX_ROUND_TIME);
      this.emitNewRoundData(d);
    }
  }

  // Returns 0 -> False No Winner
  // Returns 1 -> Draw
  // Returns 2 -> Winner Found
  private checkWinner(): number {
    //Check Columns
    const board = this.board;

    const isDraw = board.every((row) => row.every((value) => value !== 0));
    console.log(`isDraw: ${isDraw}`);
    if (isDraw) return 1;

    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        if (board[i][0] === 0) continue; //First value is empty so no win

        //Winner
        return 2;
      }

      if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        if (board[0][i] === 0) continue; //First value is empty so no win
        //Winner
        return 2;
      }
    }

    //Top-Left to Bottom-Right Diagnol
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      //Winner
      if (board[0][0] !== 0) return 2;
    }

    if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      //Winner
      if (board[0][2] !== 0) return 2;
    }

    return 0;
  }

  playAgain(socket: Socket) {
    const isPlayerOne =
      this.lobby.players.findIndex((player) => player.id === socket.id) === 0
        ? true
        : false;

    const emit_restart = () => {
      const num =
        (this.playerOneRestart ? 1 : 0) + (this.playerTwoRestart ? 1 : 0);
      console.log(num);
      this.broadcast('tictactoe_replay', num);
    };

    //Check to make sure playerOneRestart isnt already true this prevents users
    //from spamming other members with restart request
    if (isPlayerOne && !this.playerOneRestart) {
      this.playerOneRestart = true;
      emit_restart();
    } else if (!isPlayerOne && !this.playerTwoRestart) {
      this.playerTwoRestart = true;
      emit_restart();
    }

    if (this.playerOneRestart && this.playerTwoRestart) {
      //Handle Restart
      setTimeout(() => {
        this.setupGame();
      }, 2500);
    }
  }
}
