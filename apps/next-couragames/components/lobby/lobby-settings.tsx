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
  game: Games;
  // settings: Settings;
}

export default function LobbySettings({
  lobby,
  setLobby,
  game,
}: LobbySettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRandomNames, setIsRandomNames] = useState(false);

  const socket = useContext(SocketContext).socket;

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const handleStart = () => {
    socket.emit('lobby', {
      game,
      type: LobbyEvents.Start,
      id: lobby.id,
    });

    console.log('Starting Game');
  };

  return (
    <>
      {lobby.players.length >= lobby.minPlayers && (
        <MenuButton onClick={handleStart}>Start Game</MenuButton>
      )}
      <MenuButton onClick={toggleSettings}>Settings</MenuButton>
      <SettingsModal open={isOpen}>
        <Container>
          <div className="title">
            <TitleBar>
              <h2>Settings</h2>
              <span onClick={toggleSettings}>X</span>
            </TitleBar>

            <div>
              <Checkbox
                title={'Random Names'}
                toggled={isRandomNames}
                onToggle={(value) => setIsRandomNames(value)}
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
    </>
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
  /* background-color: #293a43; */
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
  }
`;
