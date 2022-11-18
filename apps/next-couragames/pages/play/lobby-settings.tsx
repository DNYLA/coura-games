import { Box, Flex } from '@chakra-ui/react';
import { ClientLobby, Games, LobbyEvents } from '@couragames/shared-types';
import styled from '@emotion/styled';
import SocketContext from 'apps/next-couragames/context/socket';
import { MenuButton } from 'apps/next-couragames/utils/styles';
import Checkbox from 'libs/ui/src/lib/forms/checkbox';
import Range from 'libs/ui/src/lib/forms/range';
import React, { useContext, useEffect, useState } from 'react';

export interface LobbySettingsProps {
  lobby: ClientLobby;
  setLobby: React.Dispatch<React.SetStateAction<ClientLobby>>;
  // settings: Settings;
  type: Games;
}

export default function LobbySettings({
  lobby,
  setLobby,
  // settings,
  type,
}: LobbySettingsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const socket = useContext(SocketContext).socket;
  const [isSettings, setIsSettings] = useState(false);
  const [minPlayers, setMinPlayers] = useState(2);

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
      game: type,
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

  const handleSettings = (value: boolean) => {
    setIsSettings(value);
  };

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

      <SettingsModal open={isOpen}>
        <Container>
          <div className="title">
            <TitleBar>
              <h2>Settings</h2>
              <span>X</span>
            </TitleBar>

            <div>
              <Checkbox
                title={'Random Names'}
                toggled={isSettings}
                onToggle={handleSettings}
              />
              <Range
                title="Max Players"
                min={lobby.minPlayers}
                max={lobby.maxPlayersAllowed}
                step={1}
                value={lobby.settings.maxPlayers}
                onChange={(value) =>
                  setLobby({
                    ...lobby,
                    settings: { ...lobby.settings, maxPlayers: value },
                  })
                }
              />
            </div>
          </div>
        </Container>
      </SettingsModal>
    </StyledHome>
  );
}

const SettingsModal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 300px;
  background-color: #2e3a4e;
  padding: 5px;
  border-radius: 6px;

  .title {
  }
`;

const TitleBar = styled.div`
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 100%;
  background-color: #293a43;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  span {
    position: fixed;
    right: 0;
  }
`;

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
