import {
  ChatData,
  ClientLobby,
  Games,
  LobbyEvents,
  PartialInbox,
  User,
} from '@couragames/shared-types';
import styled from '@emotion/styled';
import SocketContext from '../../context/socket';
import { MenuButton } from '../../utils/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, Range, UserContext } from '@couragames/ui';
import {
  WrapItem,
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';
import IconActionButton from '../../components/IconActionButton';

export interface LobbySettingsProps {
  lobby: ClientLobby;
  setLobby: React.Dispatch<React.SetStateAction<ClientLobby>>;
  game: Games;
  // settings: Settings;
}

export default function InviteList({
  lobby,
  setLobby,
  game,
}: LobbySettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [friendsList, setFriendsList] = useState<User[]>(null);
  const [loading, setLoading] = useState(true);
  const [eventsHandled, setEventsHandled] = useState(false);

  const socket = useContext(SocketContext).socket;
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!friendsList) socket.emit('request_friend_data');
    if (eventsHandled) return;

    socket?.on('friends_list', (data: ChatData) => {
      setFriendsList(data.friends);
      setLoading(false);
    });

    setEventsHandled(true);
  }, [socket, friendsList, eventsHandled]);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const handleInvite = (id: number) => {
    socket.emit('invite_player', {
      lobbyId: lobby.id,
      type: game,
      fromId: user.id,
      targetId: id,
    });
  };

  return (
    <>
      <MenuButton onClick={toggleSettings}>Invite Friend</MenuButton>
      <SettingsModal open={isOpen}>
        <Container>
          <div className="title">
            <TitleBar>
              <h2>Invite</h2>
              <span onClick={toggleSettings}>X</span>
            </TitleBar>

            <div>
              {friendsList &&
                friendsList.map((friend, i) => (
                  <Box
                    key={i}
                    display={'flex'}
                    alignContent={'center'}
                    alignItems={'center'}
                    padding={'5px'}
                    borderBottom={'1px solid rgba(0,0,0,0.2)'}
                    position={'relative'}
                  >
                    <WrapItem>
                      <Avatar name={friend.username} src={friend.avatarUrl}>
                        <AvatarBadge
                          boxSize="1em"
                          bg={friend.online ? 'green.500' : 'gray.500'}
                        />
                      </Avatar>
                    </WrapItem>
                    <Box
                      display={'flex'}
                      flexFlow={'column'}
                      padding={'5px'}
                      pl={'8px'}
                      cursor={'pointer'}
                      onClick={() => handleInvite(friend.id)}
                    >
                      <span style={{ fontWeight: '500' }}>
                        {friend.username}
                      </span>
                    </Box>
                    <IconActionButton
                      icon={<BiSend />}
                      callback={() => handleInvite(friend.id)}
                    />
                  </Box>
                ))}
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
