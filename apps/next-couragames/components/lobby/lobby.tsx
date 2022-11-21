import { Box, Flex } from '@chakra-ui/react';
import { ClientLobby, Games, LobbyEvents } from '@couragames/shared-types';
import styled from '@emotion/styled';
import LobbySettings from 'apps/next-couragames/components/lobby/lobby-settings';
import SocketContext from 'apps/next-couragames/context/socket';
import { MenuButton } from 'apps/next-couragames/utils/styles';
import Checkbox from 'libs/ui/src/lib/forms/checkbox';
import Range from 'libs/ui/src/lib/forms/range';
import React, { useContext, useEffect, useState } from 'react';

export interface ActiveLobbyProps {
  lobby: ClientLobby;
  setLobby: React.Dispatch<React.SetStateAction<ClientLobby>>;
  // settings: Settings;
  type: Games;
}

export default function ActiveLobby({
  lobby,
  setLobby,
  // settings,
  type,
}: ActiveLobbyProps) {
  const [isOpen, setIsOpen] = useState(true);
  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    //Check if lobby is valid
    console.log('here');
    console.log(lobby);

    socket?.on('player_joined', (player) => {
      const curPlayers = [...lobby.players];
      curPlayers.push(player);
      setLobby({ ...lobby, players: curPlayers });
    });

    return () => {
      socket.off('player_joined');
    };
  }, [socket, setLobby, lobby]);

  const handleStart = () => {
    socket.emit('lobby', {
      game: Games.RPS,
      type: LobbyEvents.Start,
      id: lobby.id,
    });

    console.log('Starting Game');
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

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  console.log(`is Host ${lobby.isHost}`);

  return (
    <StyledHome>
      <Title>Rock, Paper, Scissors</Title>
      <Flex display={'flex'} flexDir={'column'}>
        Code: {lobby.id}
      </Flex>
      <Box>{renderPlayers()}</Box>

      {lobby.isHost && lobby.players.length >= lobby.minPlayers && (
        <>
          <MenuButton onClick={handleStart}>Start Game</MenuButton>
          <MenuButton onClick={toggleSettings}>Settings</MenuButton>
        </>
      )}

      {lobby.isHost && <LobbySettings lobby={lobby} setLobby={setLobby} />}
    </StyledHome>
  );
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
