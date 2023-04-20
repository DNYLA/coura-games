import {
  Games,
  RPSMove,
  RPSRoundInfo,
  RPSWinner,
  TicTacToeInfo,
} from '@couragames/shared-types';
import styled from '@emotion/styled';
import Lobby from '../../../components/lobby';
import SocketContext from '../../../context/socket';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MenuButton } from '../../../utils/styles';
import { Box } from '@chakra-ui/react';
import Timer from '../../../components/Timer';

export default function TicTacToe() {
  const router = useRouter();
  const socket = useContext(SocketContext).socket;
  const [score, setScore] = useState<RPSRoundInfo>();
  const [results, setResults] = useState<RPSWinner>();
  //Indicates weather round is currently active
  //Cant really use timer because both players could have alreadt made there moves before timer
  //runs out
  useEffect(() => {
    socket?.on('rps_round_started', (info) => {
      setScore(info);
      setResults(null);
    });

    socket?.on('rps_round_ended', (data) => {
      setResults(data);
    });

    return () => {
      socket.off('player_joined');
    };
  }, [socket, router, router.query.lobby]);

  const submitMove = (move: RPSMove) => {
    socket.emit('rps_move', { id: router.query.lobby, move: move });
  };

  const getMoveText = (move: RPSMove) => {
    switch (move) {
      case RPSMove.Rock:
        return 'Rock';
      case RPSMove.Paper:
        return 'Paper';
      case RPSMove.Scissors:
        return 'Scissors';
    }
  };

  // const checkWin = () => {};
  return (
    <Lobby game={Games.RPS} redirect="rps">
      <Container>
        {results ? (
          <div>
            <p>
              {results.p1.name} Move {getMoveText(results.p1.move)}
            </p>
            <p>
              {results.p2.name} Move {getMoveText(results.p2.move)}
            </p>
            <p>
              Winner{' '}
              {results.winner
                ? 'Player One'
                : results.winner === null
                ? 'Draw'
                : 'Player Two'}
            </p>
          </div>
        ) : (
          <Box
            justifyContent="center"
            alignContent="center"
            display="flex"
            flexFlow="column"
            flexDir="column"
          >
            <Box display="flex" justifyContent="center">
              <Timer end={new Date(score?.timer ?? 0)} />
            </Box>
            <Box display="flex" justifyContent="center" gap="5">
              <MenuButton onClick={() => submitMove(RPSMove.Rock)}>
                Rock
              </MenuButton>
              <MenuButton onClick={() => submitMove(RPSMove.Paper)}>
                Paper
              </MenuButton>
              <MenuButton onClick={() => submitMove(RPSMove.Scissors)}>
                Scissors
              </MenuButton>
            </Box>
            <Box>
              Score:
              <p>
                {score?.p1.name}: {score?.p1.score}
              </p>
              <p>
                {score?.p2.name}: {score?.p2.score}
              </p>
            </Box>
          </Box>
        )}
      </Container>
    </Lobby>
  );
}

const cols = {
  naughts: '#feaf00',
  crosses: '#00c7bf',
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .stat_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* background-color: red; */
    min-width: 250px;
  }
`;

const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* background-color: red; */
  min-width: 250px;
`;

const GameInfo = styled.div<{ type: number }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: ${(props) =>
    props.type === 0
      ? cols.crosses
      : props.type === 1
      ? '#a3bfca'
      : cols.naughts};

  margin: 10px 15px;
  height: 50px;
  display: flex;
  font-size: 14px;
  text-align: center;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;

  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const GridItem = styled.div<{ value: number }>`
  cursor: ${(props) => (props.value === 0 ? 'pointer' : 'not-allowed')};
  margin: 10px 15px;
  height: 50px;
  display: flex;
  font-size: 25px;
  text-align: center;
  background-color: #173641;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.value === 1 ? cols.crosses : cols.naughts)};
`;
