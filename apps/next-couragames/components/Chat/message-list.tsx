import { WrapItem, Avatar, AvatarBadge, Box } from '@chakra-ui/react';
import { PartialInbox, User } from '@couragames/shared-types';

export interface MessageListProps {
  setId: any;
  inboxes: PartialInbox[];
}

export default function ChatMessages({ setId, inboxes }: MessageListProps) {
  return (
    <Box maxH={'100%'} overflow={'auto'}>
      {inboxes.map((inbox, i) => (
        <Box
          key={i}
          display={'flex'}
          alignContent={'center'}
          alignItems={'center'}
          padding={'5px'}
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
        >
          <WrapItem>
            <Avatar name={inbox.user.username} src={inbox.user.avatarUrl}>
              <AvatarBadge
                boxSize="1em"
                bg={inbox.user.online ? 'green.500' : 'gray.500'}
              />
            </Avatar>
          </WrapItem>
          <Box
            display={'flex'}
            flexFlow={'column'}
            padding={'5px'}
            pl={'8px'}
            cursor={'pointer'}
            onClick={() => setId(inbox.user.username)}
          >
            <span style={{ fontWeight: '500' }}>{inbox.user.username}</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>
              {inbox.lastMessage}
            </span>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
