import { setLobby } from 'libs/game-logic/src/lib/redisManager';
import { Game } from 'libs/game-logic/src/lib/utils/game';
import { Lobby } from 'libs/game-logic/src/lib/utils/types';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const MAX_ROUND_TIME = 60;

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
  constructor(lobby: Lobby, host: Socket) {
    super(lobby, host);
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
      p1Score: this.lobby.players[0].points,
      // p2Score: this.lobby.players[1].points,
      totalRounds: 0,
      currentRound: 0,
      timer: timer.getTime(),
    };

    this.host.to(this.lobby.id).emit('tictac_round_started', roundInfo);
    this.host.emit('tictac_round_started', roundInfo);
    this.lobby.started = true; //Game is now live
    setLobby(this.lobby.id, this.lobby);
  }
}
