import { WrapItem, Avatar, AvatarBadge, Box } from '@chakra-ui/react';

interface FriendsListProps {
  setId: any;
}

export default function FriendsList({ setId }: FriendsListProps) {
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
