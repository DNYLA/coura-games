import { ChatMenuProps } from './chat-menu';
import React from 'react';
import {
  Avatar,
  AvatarBadge,
  Box,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from '@couragames/shared-types';

export interface FriendsListProps {
  setId: any;
  friends: User[];
}

export default function FriendsList({ setId, friends }: FriendsListProps) {
  const value = useColorModeValue('#F9FAFB', 'gray.600');
  return (
    <div>
      {friends.map((friend, i) => (
        <Box
          key={i}
          display={'flex'}
          alignContent={'center'}
          alignItems={'center'}
          padding={'5px'}
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
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
            onClick={() => setId(friend.username)}
          >
            <span style={{ fontWeight: '500' }}>{friend.username}</span>
          </Box>
        </Box>
      ))}
    </div>
  );
}
