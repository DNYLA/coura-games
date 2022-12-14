import {
  Alert,
  AlertIcon,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { Games, LobbyEvents } from '@couragames/shared-types';
import styled from '@emotion/styled';
import SocketContext from 'apps/next-couragames/context/socket';
import { getDisplayName } from 'apps/next-couragames/utils/helpers';
import { MenuButton } from 'apps/next-couragames/utils/styles';
import { useContext, useState } from 'react';

export interface CreateLobbyProps {
  onJoin: (code: string) => void;
  errorMessage?: string;
  game: Games;
}

export default function CreateLobby({
  onJoin,
  errorMessage,
  game,
}: CreateLobbyProps) {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');

  const socket = useContext(SocketContext).socket;

  const showJoin = () => {
    // socket.emit('lobby', { game: Games.RPS, type: LobbyEvents.Join, id: 5 });
    setShowInput(!showInput);
  };

  const handleCreate = () => {
    socket.emit('lobby', { game, type: LobbyEvents.Create });
    // router.push('?lobby=5');
  };

  return (
    <StyledHome>
      <Title>{getDisplayName(game)}</Title>
      {errorMessage && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          {errorMessage}
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
              <Button h="1.75rem" size="sm" onClick={() => onJoin(code)}>
                Connect
              </Button>
            </InputRightElement>
          </InputGroup>
        )}
      </Flex>
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
