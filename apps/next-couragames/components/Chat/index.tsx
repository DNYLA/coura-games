import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faClose,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { FaChevronLeft } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import {
  Button,
  Collapse,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import ChatMenu from './chat-menu';
import DirectMessage from './direct-message';
import SocketContext from '../../context/socket';
import { ChatData, PartialInbox, User } from '@couragames/shared-types';

export default function Chat() {
  const [chatId, setChatId] = useState(null);
  const [friendsList, setFriendsList] = useState(null);
  const [inboxes, setInboxes] = useState<PartialInbox[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsHandled, setEventsHandled] = useState(false);
  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    if (!friendsList) socket.emit('request_friend_data');
    if (eventsHandled) return;

    socket?.on('friends_list', (data: ChatData) => {
      console.log(data);
      setFriendsList(data.friends);
      setInboxes(data.inbox);
      setLoading(false);
    });

    socket?.on('update_inbox', (data: PartialInbox[]) => {
      setInboxes(data);
    });

    setEventsHandled(true);
  }, [socket, friendsList, inboxes, eventsHandled]);

  const getInbox = (username: string) => {
    const inbox = inboxes.find((inbox) => inbox.user.username === username);
    console.log(`found: `);
    console.log(inboxes);
    console.log(inbox);

    return inbox;
  };

  if (loading) return <div>Loading...</div>;

  if (!chatId)
    return (
      <ChatMenu setId={setChatId} friends={friendsList} inboxes={inboxes} />
    );

  return (
    <>
      <TitleContainer>
        <IconButton
          onClick={() => setChatId(null)}
          size={'sm'}
          aria-label="Search.."
          icon={<FaChevronLeft />}
        />
        <p>{chatId}</p>
      </TitleContainer>
      <DirectMessage id={chatId} inbox={getInbox(chatId)} />
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  text-align: center;
  p {
    margin-left: 60px;
  }
`;
