import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faCircleXmark,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { Icon, WarningIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  SlideFade,
  useDimensions,
  WrapItem,
} from '@chakra-ui/react';

interface FriendsListProps {
  setId: any;
}

function FriendsList({ setId }: FriendsListProps) {
  const friendsList = [
    {
      name: 'John',
      lastMessage: 'Hop on Fortnight!',
      online: true,
      avatar:
        'https://i.scdn.co/image/ab6761610000e5eb9c30c6b69a55d48decd71600',
    },
    {
      name: 'Barbara',
      online: false,
      lastMessage: 'want to play a game?',
      avatar:
        'https://i1.sndcdn.com/artworks-QEVOnOm6VJ04F5Rp-1fEbAA-t500x500.jpg',
    },
    {
      name: 'John',
      lastMessage: 'Hop on Fortnight!',
      online: true,
      avatar:
        'https://i.scdn.co/image/ab6761610000e5eb9c30c6b69a55d48decd71600',
    },
    {
      name: 'Barbara',
      online: false,
      lastMessage: 'want to play a game?',
      avatar:
        'https://i1.sndcdn.com/artworks-QEVOnOm6VJ04F5Rp-1fEbAA-t500x500.jpg',
    },
    {
      name: 'John',
      lastMessage: 'Hop on Fortnight!',
      online: true,
      avatar:
        'https://i.scdn.co/image/ab6761610000e5eb9c30c6b69a55d48decd71600',
    },
    {
      name: 'Barbara',
      online: false,
      lastMessage: 'want to play a game?',
      avatar:
        'https://i1.sndcdn.com/artworks-QEVOnOm6VJ04F5Rp-1fEbAA-t500x500.jpg',
    },
  ];
  return (
    <Box maxH={'100%'} overflow={'auto'}>
      {friendsList.map((friend, i) => (
        <Box
          key={i}
          display={'flex'}
          alignContent={'center'}
          alignItems={'center'}
          padding={'5px'}
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
        >
          <WrapItem>
            <Avatar name={friend.name} src={friend.avatar}>
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
          </WrapItem>
          <Box
            display={'flex'}
            flexFlow={'column'}
            padding={'5px'}
            pl={'8px'}
            cursor={'pointer'}
            onClick={() => setId(friend.name)}
          >
            <span style={{ fontWeight: '500' }}>{friend.name}</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>
              {friend.lastMessage}
            </span>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function DirectMessage() {
  return <Box>This is a DM</Box>;
}

export default function Chat() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(null);

  const hide = {
    display: 'none',
  };

  const show = {
    display: 'block',
  };

  const toggle = () => setIsOpen(!isOpen);
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  console.log(dimensions);
  return (
    <ChatBox>
      <SlideFade in={isOpen} offsetY="20px">
        <Container ref={elementRef} style={isOpen ? show : hide}>
          <Header onClick={toggle}>
            {chatId ? (
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setChatId(null);
                }}
              />
            ) : (
              <div></div>
            )}
            {/* <Icon as={faChevronLeft} /> */}
            <h1 style={{ fontWeight: '600' }}>Chat</h1>
            <FontAwesomeIcon icon={faClose} style={{ cursor: 'pointer' }} />
            {/* <FontAwesomeIcon icon={faCircleXmark} style={{}} /> */}
          </Header>
          <Box h={'calc(100% - 35px)'}>
            {chatId ? <DirectMessage /> : <FriendsList setId={setChatId} />}
          </Box>
          <Box></Box>
        </Container>
      </SlideFade>
      <Popup onClick={toggle} style={isOpen ? hide : {}}>
        <span>Chat</span>
        <FontAwesomeIcon icon={faClose} style={{ cursor: 'pointer' }} />
      </Popup>
    </ChatBox>
  );
}

const ChatBox = styled.div`
  /* display: none; */
  position: fixed;
  bottom: 0;
  right: 15px;
  /* border: 3px solid #f1f1f1; */
  z-index: 9;
`;

const Popup = styled.div`
  background-color: #555;
  width: 250px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.75;
  position: fixed;
  bottom: 15px;
  right: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`;

const Container = styled.div`
  background-color: #555;
  width: 250px;
  height: 300px;
  border-radius: 5px;
  /* cursor: pointer; */
  opacity: 0.75;
  position: fixed;
  bottom: 15px;
  right: 10px;
  /* padding: 10px 15px; */
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-flow: row;
  /* display: inline-block; */
  justify-content: space-between;
  padding: 3px 10px;
  /* flex-direction: row; */
  height: 35px;
  align-items: center;
  border-bottom: 1px solid;
  box-shadow: 1px;
  h1 {
    padding: 0;
    margin: 0;
    line-height: '50px';
    vertical-align: middle;
  }
`;
