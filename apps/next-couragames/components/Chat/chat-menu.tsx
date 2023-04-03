import { AddIcon } from '@chakra-ui/icons';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { Box, IconButton } from '@chakra-ui/react';
import ChatMessages from './message-list';
import { useState } from 'react';
import { PartialInbox, User } from '@couragames/shared-types';
import FriendsList from './friend-list';

export interface ChatMenuProps {
  setId: any;
  friends: User[];
  inboxes: PartialInbox[];
}

export default function ChatMenu({ setId, friends, inboxes }: ChatMenuProps) {
  const [messageListActive, setMessageListActive] = useState(true);
  const getIcon = () => {
    if (messageListActive) return <BsFillPersonPlusFill />;
    return <IoIosArrowBack />;
  };

  return (
    <div>
      <Box position={'absolute'} right={3}>
        <IconButton
          onClick={() => setMessageListActive(!messageListActive)}
          size={'sm'}
          aria-label="Search.."
          icon={getIcon()}
        />
      </Box>

      {messageListActive ? (
        <ChatMessages setId={setId} inboxes={inboxes} />
      ) : (
        <FriendsList friends={friends} setId={setId} />
      )}
    </div>
  );
}
