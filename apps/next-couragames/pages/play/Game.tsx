import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import SocketContext from 'apps/next-couragames/context/socket';
import { ClientLobby, Games, LobbyEvents } from 'libs/shared-types/src';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

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
  const { id } = router.query;

  useEffect(() => {
    //Check if lobby is valid
    console.log('here');
    console.log(lobby);

    socket?.on('player_joined', (player) => {
      const curPlayers = [...lobby.players];
      curPlayers.push(player);
      setLobby({ ...lobby, players: curPlayers });
    });

    // socket?.on('join_lobby', (data) => {
    //   console.log(data);
    //   if (!data.valid) {
    //     router.push('/play/rock-paper-scissors');
    //   } else {
    //     setLobby(data);
    //   }
    // });
  }, [socket, router, setLobby, lobby, id]);

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

  //If !Lobby Render Create || Join Game.
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
    </StyledHome>
  );
}

export default RPSGame;
