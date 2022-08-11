import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import SocketContext from 'apps/next-couragames/context/socket';
import { RPSGame } from 'apps/next-couragames/pages/play/Game';
import { Games, LobbyEvents } from 'libs/shared-types/src';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

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
  const [lobbyInfo, setLobbyInfo] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const [invalid, setInvalid] = useState(false);
  // const {
  //   isOpen: isVisible,
  //   onClose,
  //   onOpen,
  // } = useDisclosure({ defaultIsOpen: false });

  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    socket?.on('lobby_info', (data) => {
      console.log(data);
      router.push(`?lobby=${data.code}`);
      setLobbyInfo(data);
    });

    socket?.on('join_lobby', (data) => {
      console.log(data);
      if (!data.valid) {
        setInvalid(true);
        setTimeout(() => setInvalid(false), 3500);
      }
    });

    return () => {
      socket?.off('lobby_info');
    };
  }, [socket, router]);

  console.log(lobby);
  if (lobby) {
    return <RPSGame lobby={lobbyInfo} setLobby={setLobbyInfo} />;
  }

  const handleCreate = () => {
    socket.emit('lobby', { game: Games.RPS, type: LobbyEvents.Create });
    // router.push('?lobby=5');
  };

  const handleJoin = () => {
    socket.emit('lobby', { game: Games.RPS, type: LobbyEvents.Join, id: code });
  };

  const showJoin = () => {
    // socket.emit('lobby', { game: Games.RPS, type: LobbyEvents.Join, id: 5 });
    console.log('Joining Game');
    setShowInput(!showInput);
  };

  //If !Lobby Render Create || Join Game.
  return (
    <StyledHome>
      <Title>Rock, Paper, Scissors</Title>
      {invalid && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          Lobby does not exist.
        </Alert>
      )}
      <Flex display={'flex'} flexDir={'column'}>
        <MenuButton onClick={handleCreate}>Create</MenuButton>
        <MenuButton onClick={showJoin}>
          {showInput ? 'Cancel' : 'Join'}
        </MenuButton>
        {showInput && (
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <InputRightElement width="5.5rem">
              <Button h="1.75rem" size="sm" onClick={handleJoin}>
                Connect
              </Button>
            </InputRightElement>
          </InputGroup>
        )}
      </Flex>
    </StyledHome>
  );
}

export default RPSLobby;
