import { WrapItem, Avatar, AvatarBadge, Box } from '@chakra-ui/react';
import { PartialInbox, User } from '@couragames/shared-types';
import { UserContext } from '@couragames/ui';
import { useContext } from 'react';

export interface MessageListProps {
  setId: any;
  inboxes: PartialInbox[];
}

export default function ChatMessages({ setId, inboxes }: MessageListProps) {
  const { user } = useContext(UserContext);

  const getMessageStyle = (
    read: boolean,
    lastSender: number,
    inboxId?: number
  ) => {
    const defaultStyle = {
      fontSize: '13px',
      color: 'rgba(255,255,255,0.75)',
      fontWeight: '400',
    };

    if (read) return defaultStyle;
    if (lastSender === user.id) {
      return defaultStyle;
    }

    defaultStyle.fontSize = '15px';
    defaultStyle.fontWeight = '800';
    // defaultStyle.color = 'rgba(243, 230, 230, 0.75)';

    return defaultStyle;
  };

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
            <span
              style={getMessageStyle(inbox.read, inbox.lastSenderId, inbox.id)}
            >
              {inbox.lastMessage}
            </span>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
