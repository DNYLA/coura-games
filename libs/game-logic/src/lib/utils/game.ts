import { getLobby } from 'libs/game-logic/src/lib/redisManager';
import { Lobby } from 'libs/game-logic/src/lib/utils/types';
import { Socket } from 'socket.io';

export abstract class Game {
  /**
   * Game Class
   */
  lobby: Lobby;
  host: Socket;
  readonly MAX_ROUND_TIME = 60;

  constructor(lobby: Lobby, host: Socket) {
    this.lobby = lobby;
    this.host = host;

    const d = new Date();
    d.setSeconds(d.getSeconds() + this.MAX_ROUND_TIME);

    setTimeout(() => this.roundEnded(0), this.MAX_ROUND_TIME * 1000);

    this.emitNewRoundData(d);
  }

  abstract roundEnded(round: number): void;
  abstract nextRound(round: number): void;
  abstract emitNewRoundData(timer: Date);

  // abstract calculateMove(socket: Socket, id: string, round: number): void;
  // abstract computeWinner(socket: Socket, id: string, round: number): void;

  async validLobby(): Promise<boolean> {
    const lobby: Lobby = await getLobby(this.lobby.id);

    //If Not Valid lobby && player connected inform them lobby ended.
    if (!lobby || lobby.players.length !== lobby.minPlayers) return false; //Does lobby inclue min players.
    if (!lobby.players.find((ply) => ply.id === this.host.id)) return false; //Check if user is authenticated to access the data

    this.lobby = lobby;

    return true;
  }
}
