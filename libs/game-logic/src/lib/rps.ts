import { RPSMove, RPSRoundInfo } from '@couragames/shared-types';
import { currentGames } from 'libs/game-logic/src/lib/game-logic';
import { Lobby } from 'libs/game-logic/src/types';
import { Socket } from 'socket.io';

const MAX_ROUND_TIME = 60; //In Seconds

export function main(lobby: Lobby, host: Socket) {
  const d = new Date();
  d.setSeconds(d.getSeconds() + MAX_ROUND_TIME);

  //Call Timeout
  setTimeout(
    () => roundEndedCallback(host, lobby.id, 0),
    MAX_ROUND_TIME * 1000
  );

  //Send Current Info
  lobby.data = { round: 0, timer: d };
  const roundInfo: RPSRoundInfo = {
    p1Score: lobby.players[0].points,
    p2Score: lobby.players[0].points,
    totalRounds: 0,
    currentRound: 0,
    timer: d.getTime(),
  };

  host.to(lobby.id).emit('rps_round_started', roundInfo);
  host.emit('rps_round_started', roundInfo);
  lobby.started = true; //Game is now live
}

function nextRoundCallback(socket: Socket, id: string, round: number) {}

function roundEndedCallback(socket: Socket, id: string, round: number) {
  const lobby = validLobby(id, socket.id);
  if (!lobby) return;
  const ply = lobby.players.find((ply) => ply.id === socket.id);
  const moves = lobby.data;

  if (!moves.playerOneChoice && !moves.playerTwoChoice) {
    socket.emit('rps_round_ended', {
      p1Move: null,
      p2Move: null,
      winner: null,
    }); //send timeout message
  } else if (moves.playerOneChoice && !moves.playerTwoChoice) {
    return; //send Player One Wins
  } else if (!moves.playerOneChoice && moves.playerTwoChoice) {
    return; //send Player Two Wins
  }

  // lobby.players[]

  //Calculate Winner

  //Reset Moves
  lobby.data.playerOneChoice = undefined;
  lobby.data.playerTwoChoice = undefined;

  //Send User A Never Picked || User B Never Chose
}

export function calculateMove(socket: Socket, id: string, move: RPSMove) {
  const lobby = validLobby(id, socket.id);
  if (!lobby) return;

  const isPlayerOne =
    lobby.players.findIndex((player) => player.id === socket.id) === 0
      ? true
      : false;

  ///Not a valid move. No need to acknowledge since uer has sent over invalid move meaning they are  attempting to cheat or exploit the system
  if (!(move in RPSMove)) return;

  //Checking if the data is empty prevents cheating/users resending a "move" after selecting one.
  if (isPlayerOne && !lobby.data.playerOneChoice)
    lobby.data.playerOneChoice = move;
  else if (!lobby.data.playerTwoChoice) lobby.data.playerTwoChoice = move;

  //Verify if both players have made a choice
}

//Possibility to pass ID back then fetch
function validLobby(id: string, socketId: string) {
  const lobby = currentGames.get(id);

  //If Not Valid lobby && player connected inform them lobby ended.
  if (!lobby || lobby.players.length !== lobby.minPlayers) return null; //Does lobby inclue min players.
  if (!lobby.players.find((ply) => ply.id === socketId)) return null; //Check if user is authenticated to access the data

  return lobby;
}
