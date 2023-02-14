import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import SocketContext from '../../../context/socket';
import { RPSMove, RPSRoundInfo, RPSWinner } from '@couragames/shared-types';
import { ClientLobby, Games, LobbyEvents } from '@couragames/shared-types';
import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Timer from '../../../components/Timer';
import { MenuButton } from '../../../utils/styles';
export interface HomeProps {
  lobby: ClientLobby;
  setLobby: Dispatch<SetStateAction<ClientLobby>>;
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

export function RPSGame({ lobby, setLobby }: HomeProps) {
  const router = useRouter();
  const socket = useContext(SocketContext).socket;
  const [score, setScore] = useState<RPSRoundInfo>();
  const [results, setResults] = useState<RPSWinner>();
  //Indicates weather round is currently active
  //Cant really use timer because both players could have alreadt made there moves before timer
  //runs out
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
      setResults(null);
      console.log(info);
      console.log('Started Game');
    });

    socket?.on('rps_round_ended', (data) => {
      setResults(data);
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

  const renderPlayers = () => {
    if (lobby.players.length === 1) {
      return <p>Waiting for opponent to join...</p>;
    } else
      return (
        <p>
          You vs {lobby.players.find((ply) => ply.id !== socket.id).username}
        </p>
      );
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
        <Box>{renderPlayers()}</Box>

        {lobby.isHost && lobby.players.length === lobby.minPlayers && (
          <MenuButton onClick={handleStart}>Start Game</MenuButton>
        )}
      </StyledHome>
    );

  //Round/Play Game here

  if (results)
    return (
      <div>
        <p>Player One Move {results.p1Move}</p>
        <p>Player Two Move {results.p2Move}</p>
        <p>
          Winner{' '}
          {results.winner
            ? 'Player One'
            : results.winner === null
            ? 'Draw'
            : 'Player Two'}
        </p>
      </div>
    );

  return (
    <Box
      justifyContent="center"
      alignContent="center"
      display="flex"
      flexFlow="column"
      flexDir="column"
    >
      <Box display="flex" justifyContent="center">
        <Timer end={new Date(score.timer)} />
      </Box>
      <Box display="flex" justifyContent="center" gap="5">
        <MenuButton onClick={() => submitMove(RPSMove.Rock)}>Rock</MenuButton>
        <MenuButton onClick={() => submitMove(RPSMove.Paper)}>Paper</MenuButton>
        <MenuButton onClick={() => submitMove(RPSMove.Scissors)}>
          Scissors
        </MenuButton>
      </Box>

      <Box>
        Score:
        <p>Player One: {score.p1Score}</p>
        <p>Player Two: {score.p2Score}</p>
      </Box>
    </Box>
  );
}

export default RPSGame;
