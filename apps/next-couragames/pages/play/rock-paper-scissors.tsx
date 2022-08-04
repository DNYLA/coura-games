import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import SocketContext from 'apps/next-couragames/context/socket';
import { Games, LobbyEvents } from 'libs/shared-types/src';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

/* eslint-disable-next-line */
export interface HomeProps {}

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

export function RPSLobby(props: HomeProps) {
  const router = useRouter();
  const { lobby } = router.query;
  const [lobbyCode, setLobbyCode] = useState(null);
  const socket = useContext(SocketContext).socket;

  console.log(lobby);
  if (lobby) {
    return <div>Waiting for host to start game...</div>;
  }

  const handleCreate = () => {
    socket.emit('lobby', { game: Games.RPS, event: LobbyEvents.Create });
    // router.push('?lobby=5');
  };
  const handleJoin = () => {
    socket.emit('lobby', { game: Games.RPS, event: LobbyEvents.Create });
    console.log('Joining Game');
  };

  //If !Lobby Render Create || Join Game.
  return (
    <StyledHome>
      <Title>Rock, Paper, Scissors</Title>
      <Flex display={'flex'} flexDir={'column'}>
        <MenuButton onClick={handleCreate}>Create</MenuButton>
        <MenuButton onClick={handleJoin}>Join</MenuButton>
      </Flex>
    </StyledHome>
  );
}

export default RPSLobby;
