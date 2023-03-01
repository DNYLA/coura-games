import { getLobby } from '../redisManager';
import { Lobby } from '@couragames/api/services';
import { Socket } from '@couragames/shared-types';
import { SocketIO, UserService, MatchService } from '@couragames/api/services';
import { Prisma, GameType, Result } from '@prisma/client';

export type GamePlayer = {
  id: string;
};

export abstract class Game {
  /**
   * Game Class
   */
  lobby: Lobby;
  host: Socket;
  players: Socket[];
  playback: object; //This will be set inside child classes data type not needed on this level.
  readonly MAX_ROUND_TIME = 60;

  constructor(lobby: Lobby, host: Socket, players: Socket[]) {
    this.lobby = lobby;
    this.host = host;
    this.players = players;
    this.setupGame();
  }

  async setupGame() {
    const d = new Date();
    d.setSeconds(d.getSeconds() + this.MAX_ROUND_TIME);
    this.init(d);

    setTimeout(() => this.roundEnded(0), this.MAX_ROUND_TIME * 1000);

    this.emitNewRoundData(d);
  }

  abstract init(timer?: Date): void;
  abstract roundEnded(round: number): void;
  abstract nextRound(round: number): void;
  abstract emitNewRoundData(timer: Date): void;
  abstract restartGame(socket: Socket): void;
  abstract handleTurn(socket: Socket, data: unknown): void;
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

  async updatePoints(socketId: string, amount: number): Promise<number> {
    const socket = SocketIO.server.sockets.sockets.get(socketId);
    if (!socket) return -1;
    if (!socket.data.user) return -1;

    const { points } = await UserService.updateUser(socket.data.user.id, {
      points: { increment: amount },
    });

    return points;
  }

  async submitMatch(getPoints: (socketId: string) => Result, type: GameType) {
    const data: Prisma.MatchPlayerCreateManyMatchInput[] = [];

    this.players.forEach((player) => {
      if (!player.data.user) return;

      data.push({
        userId: player.data.user.id,
        result: getPoints(player.id),
      });
    });

    if (data.length !== this.players.length) return; //Playing Against a guest dont store info

    await MatchService.createMatch(data, this.playback, type);
  }

  broadcast(event: string, message: unknown): void {
    this.host.to(this.lobby.id).emit(event, message);
    this.host.emit(event, message);
  }
}
