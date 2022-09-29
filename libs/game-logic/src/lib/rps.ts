import { RPSMove, RPSRoundInfo } from '@couragames/shared-types';
import { currentGames } from 'libs/game-logic/src/lib/game-logic';
import { Lobby } from 'libs/game-logic/src/types';
import { Socket } from 'socket.io';

const MAX_ROUND_TIME = 60; //In Seconds

export function main(lobby: Lobby, host: Socket) {
  const d = new Date();
  d.setSeconds(d.getSeconds() + MAX_ROUND_TIME);

  //Call Timeout
  setTimeout(() => roundEndedCallback(host, lobby.id), MAX_ROUND_TIME * 1000);

  //Send Current Info
  lobby.data = { round: 0, timer: d };
  const roundInfo: RPSRoundInfo = {
    p1Score: lobby.players[0].points,
    p2Score: lobby.players[0].points,
    totalRounds: 0,
    currentRound: 0,
    timer: d,
  };
  host.to(lobby.id).emit('round_started', roundInfo);
  host.emit('round_started', roundInfo);
  lobby.started = true; //Game is now live
}

function roundEndedCallback(socket: Socket, id: string) {
  const lobby = currentGames.get(id);

  if (!lobby || lobby.players.length !== lobby.minPlayers) return; //Send Ack?

  //Send User A Never Picked || User B Never Chose
}

function calculateMove(socket: Socket, move: RPSMove) {}
