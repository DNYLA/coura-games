import { RPSMove, RPSRoundInfo } from '@couragames/shared-types';
import { setLobby } from './redisManager';
import { Game } from './utils/game';
import { Lobby } from './utils/types';
import { Socket } from '@couragames/shared-types';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class RPS extends Game {
  /**
   *
   */
  constructor(lobby: Lobby, host: Socket) {
    super(lobby, host);
  }

  async init(timer: Date): Promise<void> {
    const lobby = this.lobby;

    //Set Current Info
    lobby.data = {
      round: 0,
      timer,
      playerOneChoice: null,
      playerTwoChoice: null,
    };
    this.lobby.started = true;
    await setLobby(lobby.id, lobby);
  }

  async roundEnded(round: number): Promise<void> {
    const lobby = this.lobby;
    const host = this.host;
    if (lobby.data.round !== round) return; // Not the same round dont run
    lobby.data.round++; //Increment round here to prevent any timeouts from running incorrently

    const ply = lobby.players.find((ply) => ply.id === host.id);
    const moves = lobby.data;
    const p1Move = moves.playerOneChoice,
      p2Move = moves.playerTwoChoice;
    let winner = null; //IF true P1 won if false P2 Won

    if (p1Move && !p2Move) {
      winner = true;
    } else if (!p1Move && p2Move) {
      winner = false;
    } else {
      winner = this.computeWinner(p1Move, p2Move);
    }

    this.broadcast('rps_round_ended', { p1Move, p2Move, winner });

    //Update Winner
    if (winner) {
      lobby.players[0].points++;
    } else {
      lobby.players[1].points++;
    }

    //Reset Moves
    lobby.data.playerOneChoice = null;
    lobby.data.playerTwoChoice = null;

    await setLobby(lobby.id, lobby);
    //Set Timeout for 5 seconds to start new round.
    setTimeout(() => this.nextRound(round), 5000);
  }

  nextRound(round: number): void {
    const d = new Date();
    d.setSeconds(d.getSeconds() + this.MAX_ROUND_TIME);

    //Call Timeout
    setTimeout(() => this.roundEnded(round), this.MAX_ROUND_TIME * 1000);

    this.emitNewRoundData(d);
  }

  emitNewRoundData(timer: Date) {
    const roundInfo: RPSRoundInfo = {
      p1Score: this.lobby.players[0].points,
      p2Score: this.lobby.players[1].points,
      totalRounds: 0,
      currentRound: 0,
      timer: timer.getTime(),
    };

    this.broadcast('rps_round_started', roundInfo);
    // this.host.to(this.lobby.id).emit('tictac_nextround', roundInfo);
    // this.host.emit('tictac_nextround', roundInfo);
    this.lobby.started = true; //Game is now live (Sometimes this will already be set to true)
    setLobby(this.lobby.id, this.lobby);
  }

  async calculateMove(socket: Socket, move: RPSMove) {
    const lobby = this.lobby;

    const isPlayerOne =
      lobby.players.findIndex((player) => player.id === socket.id) === 0
        ? true
        : false;
    console.log('Here 1.0');
    console.log(move);
    ///Not a valid move. No need to acknowledge since uer has sent over invalid move meaning they are  attempting to cheat or exploit the system
    if (!(move in RPSMove)) return;
    console.log('Here');
    //Checking if the data is empty prevents cheating/users resending a "move" after selecting one.
    if (isPlayerOne && !lobby.data.playerOneChoice) {
      lobby.data.playerOneChoice = move;
    } else if (!lobby.data.playerTwoChoice) {
      lobby.data.playerTwoChoice = move;
    }

    await setLobby(lobby.id, lobby);
    //Verify if both players have made a choice
    //Must check if it is undefined as according to javascript
    //the number 0 is also represents false so we can not check if (!playerOneChoice)
    if (
      lobby.data.playerOneChoice === null ||
      lobby.data.playerTwoChoice === null
    )
      return;

    this.roundEnded(lobby.data.round);
  }

  async handleTurn(socket: Socket, move: RPSMove) {
    const lobby = this.lobby;
    const isPlayerOne =
      lobby.players.findIndex((player) => player.id === socket.id) === 0
        ? true
        : false;
    console.log('Here 1.0');
    console.log(move);
    ///Not a valid move. No need to acknowledge since uer has sent over invalid move meaning they are  attempting to cheat or exploit the system
    if (!(move in RPSMove)) return;
    console.log('Here');
    //Checking if the data is empty prevents cheating/users resending a "move" after selecting one.
    if (isPlayerOne && !lobby.data.playerOneChoice) {
      lobby.data.playerOneChoice = move;
    } else if (!lobby.data.playerTwoChoice) {
      lobby.data.playerTwoChoice = move;
    }

    await setLobby(lobby.id, lobby);
    //Verify if both players have made a choice
    //Must check if it is undefined as according to javascript
    //the number 0 is also represents false so we can not check if (!playerOneChoice)
    if (
      lobby.data.playerOneChoice === null ||
      lobby.data.playerTwoChoice === null
    )
      return;

    this.roundEnded(lobby.data.round);
  }

  //https://stackoverflow.com/questions/41457556/rock-paper-scissors-get-winner-mathematically
  //Equation from StackOverFlow
  //Returns true if p1 wins, false if p2 wins undefined if draw
  computeWinner(m1: RPSMove, m2: RPSMove) {
    if ((m1 + 1) % 3 == m2) return false;
    else if (m1 == m2) return null;
    else return true;
  }

  restartGame(socket: Socket): void {
    throw 'Not Implemented';
  }
}
