import { PhoneIcon, CheckIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Fade,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  InputRightElement,
  SlideFade,
  Stack,
  useDisclosure,
  Avatar,
  AvatarBadge,
  WrapItem,
} from '@chakra-ui/react';
import { User } from '@couragames/shared-types';
import { searchUsers } from '@couragames/ui';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
export type GameSearchItem = {
  display: string;
  action: string;
};
export default function Search() {
  const gameData: GameSearchItem[] = [
    { display: 'Rock, Paper Scissors', action: '/play/rock-paper-scissors' },
    { display: 'Tic Tac Toe', action: '/play/tic-tac-toe' },
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchtext] = useState('');
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  const getGameResults = () => {
    const foundItems: GameSearchItem[] = [];

    gameData.forEach((game) => {
      const split = searchText.split(' ');
      for (let i = 0; i < split.length; i++) {
        const word = split[i];
        if (word === '' || word === ' ') continue;
        const title = game.display.toLowerCase();
        if (title.includes(word.toLowerCase())) {
          foundItems.push(game);
          break;
        }
      }
    });

    return foundItems;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != '')
      searchUsers(e.target.value).then(({ data }) => {
        setUsers(data);
      });

    setSearchtext(e.target.value);
  };

  const router = useRouter();
  const searchInput = useRef();
  return (
    <Box onFocus={onOpen} onBlur={onClose} width={'100%'}>
      <Stack spacing={4}>
        <InputGroup>
          <Input
            placeholder="Search..."
            ref={searchInput}
            value={searchText}
            onChange={handleInputChange}
          />
          <InputRightElement>
            <SearchIcon color={isOpen ? 'white' : 'gray'} animation={'100ms'} />
          </InputRightElement>
        </InputGroup>
      </Stack>

      <SlideFade in={isOpen} offsetY="20px" unmountOnExit reverse>
        <Box p="40px" color="white" mt="4" rounded="md" shadow="md">
          <Text fontSize="xl">Games</Text>
          <Box>
            {getGameResults().map((result, i) => (
              <Box
                cursor={'pointer'}
                key={i}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  router.push(result.action);
                }}
              >
                {result.display}
              </Box>
            ))}
          </Box>
          <Text mt={'10px'} fontSize="xl">
            Members
          </Text>
          <Box>
            {users.map((user, i) => (
              <Box
                key={i}
                display={'flex'}
                alignContent={'center'}
                alignItems={'center'}
                padding={'5px'}
                borderBottom={'1px solid rgba(0,0,0,0.2)'}
                position={'relative'}
                cursor={'pointer'}
                onClick={() => router.push(`/member/${user.username}`)}
              >
                <WrapItem>
                  <Avatar name={user.username} src={user.avatarUrl} />
                </WrapItem>
                <Box
                  display={'flex'}
                  flexFlow={'column'}
                  padding={'5px'}
                  pl={'8px'}
                  cursor={'pointer'}
                >
                  <span style={{ fontWeight: '500' }}>{user.username}</span>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </SlideFade>
    </Box>
  );
}
