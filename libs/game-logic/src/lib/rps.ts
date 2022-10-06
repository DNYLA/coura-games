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
    p2Score: lobby.players[1].points,
    totalRounds: 0,
    currentRound: 0,
    timer: d.getTime(),
  };

  host.to(lobby.id).emit('rps_round_started', roundInfo);
  host.emit('rps_round_started', roundInfo);
  lobby.started = true; //Game is now live
}

function nextRoundCallback(socket: Socket, id: string, round: number) {
  const lobby = validLobby(id, socket.id);
  if (!lobby) return;

  const d = new Date();
  d.setSeconds(d.getSeconds() + MAX_ROUND_TIME);

  //Call Timeout
  setTimeout(
    () => roundEndedCallback(socket, id, round),
    MAX_ROUND_TIME * 1000
  );

  //Send Current Info
  const roundInfo: RPSRoundInfo = {
    p1Score: lobby.players[0].points,
    p2Score: lobby.players[1].points,
    totalRounds: 0,
    currentRound: round,
    timer: d.getTime(),
  };

  socket.to(lobby.id).emit('rps_round_started', roundInfo);
  socket.emit('rps_round_started', roundInfo);
}

function roundEndedCallback(socket: Socket, id: string, round: number) {
  const lobby = validLobby(id, socket.id);
  if (!lobby) return;
  if (lobby.data.round !== round) return; // Not the same round dont run
  lobby.data.round++; //Increment round here to prevent any timeouts from running incorrently

  const ply = lobby.players.find((ply) => ply.id === socket.id);
  const moves = lobby.data;
  const p1Move = moves.playerOneChoice,
    p2Move = moves.playerTwoChoice;
  let winner = null; //IF true P1 won if false P2 Won

  if (p1Move && !p2Move) {
    winner = true;
  } else if (!p1Move && p2Move) {
    winner = false;
  } else {
    winner = computeWinner(p1Move, p2Move);
  }

  socket.to(lobby.id).emit('rps_round_ended', { p1Move, p2Move, winner });
  socket.emit('rps_round_ended', { p1Move, p2Move, winner });

  //Update Winner

  if (winner) {
    lobby.players[0].points++;
  } else {
    lobby.players[1].points++;
  }

  //Reset Moves
  lobby.data.playerOneChoice = undefined;
  lobby.data.playerTwoChoice = undefined;

  //Set Timeout for 5 seconds to start new round.
  setTimeout(() => nextRoundCallback(socket, id, round), 5000);
}

//https://stackoverflow.com/questions/41457556/rock-paper-scissors-get-winner-mathematically
//Equation from StackOverFlow
//Returns true if p1 wins, false if p2 wins undefined if draw
function computeWinner(m1: RPSMove, m2: RPSMove) {
  if ((m1 + 1) % 3 == m2) return false;
  else if (m1 == m2) return null;
  else return true;
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

  console.log('is plauer one:', isPlayerOne);

  //Checking if the data is empty prevents cheating/users resending a "move" after selecting one.
  if (isPlayerOne && !lobby.data.playerOneChoice) {
    lobby.data.playerOneChoice = move;
    console.log('Confirmed set player1');
  } else if (!lobby.data.playerTwoChoice) {
    lobby.data.playerTwoChoice = move;
    console.log('confirmed set p2');
  }

  console.log('verifying');
  console.log(lobby.data);

  //Verify if both players have made a choice
  //Must check if it is undefined as according to javascript
  //the number 0 is also represents false so we can not check if (!playerOneChoice)
  if (
    lobby.data.playerOneChoice === undefined ||
    lobby.data.playerTwoChoice === undefined
  )
    return;
  console.log('Calling endCallback');
  roundEndedCallback(socket, id, lobby.data.round);
}

//Possibility to pass ID back then fetch
function validLobby(id: string, socketId: string) {
  const lobby = currentGames.get(id);

  //If Not Valid lobby && player connected inform them lobby ended.
  if (!lobby || lobby.players.length !== lobby.minPlayers) return null; //Does lobby inclue min players.
  if (!lobby.players.find((ply) => ply.id === socketId)) return null; //Check if user is authenticated to access the data

  return lobby;
}
