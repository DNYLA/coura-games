import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import SocketContext from 'apps/next-couragames/context/socket';
import { RPSMove, RPSRoundInfo, RPSWinner } from '@couragames/shared-types';
import { ClientLobby, Games, LobbyEvents } from 'libs/shared-types/src';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Timer from 'apps/next-couragames/components/Timer';

/* eslint-disable-next-line */
export interface HomeProps {
  lobby: ClientLobby;
  setLobby: any;
}

const StyledHome = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const MenuButton = styled.button`
  background-color: #4a5568;
  padding: 7px;
  border: 2px solid white;
  border-radius: 4px;
  font-size: 20px;
  :hover {
    background-color: #718096;
    border-radius: 7px;
    transition: all 300ms;
  }
  margin-bottom: 10px;
  transition: all 650ms ease;
`;

export function RPSGame({ lobby, setLobby }: HomeProps) {
  const router = useRouter();
  const socket = useContext(SocketContext).socket;
  const [score, setScore] = useState<RPSRoundInfo>();
  const [winner, setWinner] = useState<RPSWinner>();
  //Indicates weather round is currently active
  //Cant really use timer because both players could have alreadt made there moves before timer
  //runs out
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    //Check if lobby is valid
    console.log('here');
    console.log(lobby);

    socket?.on('player_joined', (player) => {
      const curPlayers = [...lobby.players];
      curPlayers.push(player);
      setLobby({ ...lobby, players: curPlayers });
    });

    socket?.on('rps_round_started', (info) => {
      setScore(info);
      setWinner(null);
      console.log(info);
      console.log('Started Game');
    });

    socket?.on('rps_round_ended', (data) => {
      setWinner(data);
    });

    return () => {
      socket.off('player_joined');
    };
  }, [socket, router, setLobby, lobby, router.query.lobby]);

  const handleStart = () => {
    socket.emit('lobby', {
      game: Games.RPS,
      type: LobbyEvents.Start,
      id: lobby.id,
    });

    console.log('Starting Game');
  };

  const submitMove = (move: RPSMove) => {
    socket.emit('rps_move', { id: lobby.id, move: move });
  };

  //If !Lobby Render Create || Join Game.
  //Shouldnt happen but left in testing to prevent errors
  if (!lobby) {
    return (
      <StyledHome>
        <Title>Rock, Paper, Scissors</Title>
        <Flex display={'flex'} flexDir={'column'}>
          No Lobby Found!
        </Flex>
      </StyledHome>
    );
  }

  //If game not started
  if (!score)
    return (
      <StyledHome>
        <Title>Rock, Paper, Scissors</Title>
        <Flex display={'flex'} flexDir={'column'}>
          Code: {lobby.id}
        </Flex>
        <Box>
          {lobby.players.map((p, i) => (
            <div key={i}>{p.username}</div>
          ))}
        </Box>

        {lobby.isHost && lobby.players.length === lobby.maxPlayers && (
          <MenuButton onClick={handleStart}>Start Game</MenuButton>
        )}
      </StyledHome>
    );

  //Round/Play Game here

  if (winner)
    return (
      <div>
        <p>Player One Move {winner.p1Move}</p>
        <p>Player Two Move {winner.p2Move}</p>
        <p>
          Winner{' '}
          {winner ? 'Player One' : winner === null ? 'Draw' : 'Player Two'}
        </p>
      </div>
    );

  return (
    <div>
      <Timer end={new Date(score.timer)} />
      <Box display="flex" justifyContent="center" gap="5">
        <MenuButton onClick={() => submitMove(RPSMove.Rock)}>Rock</MenuButton>
        <MenuButton onClick={() => submitMove(RPSMove.Paper)}>Paper</MenuButton>
        <MenuButton onClick={() => submitMove(RPSMove.Scissors)}>
          Scissors
        </MenuButton>
      </Box>
    </div>
  );
}

export default RPSGame;
