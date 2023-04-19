import { Box, Flex } from '@chakra-ui/react';
import { ClientLobby, Games } from '@couragames/shared-types';
import styled from '@emotion/styled';
import LobbySettings from '../../components/lobby/lobby-settings';
import SocketContext from '../../context/socket';
import { getDisplayName } from '../../utils/helpers';
import React, { useContext, useEffect } from 'react';
import InviteList from './invite-list';

export interface ActiveLobbyProps {
  lobby: ClientLobby;
  setLobby: React.Dispatch<React.SetStateAction<ClientLobby>>;
  // settings: Settings;
  game: Games;
}

export default function ActiveLobby({
  lobby,
  setLobby,
  game,
}: ActiveLobbyProps) {
  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    socket?.on('player_joined', (player) => {
      const curPlayers = [...lobby.players];
      curPlayers.push(player);
      setLobby({ ...lobby, players: curPlayers });
    });

    return () => {
      socket.off('player_joined');
    };
  }, [socket, setLobby, lobby]);

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

  return (
    <StyledHome>
      <Title>{getDisplayName(game)}</Title>
      <Flex display={'flex'} flexDir={'column'}>
        Code: {lobby.id}
      </Flex>
      <Box>{renderPlayers()}</Box>

      {lobby.isHost && (
        <>
          <InviteList lobby={lobby} setLobby={setLobby} game={game} />
          <LobbySettings lobby={lobby} setLobby={setLobby} game={game} />
        </>
      )}
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
