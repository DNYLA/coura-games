import { AddIcon } from '@chakra-ui/icons';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { Box, IconButton } from '@chakra-ui/react';
import ChatMessages, { FriendsListProps } from './friends-list';
import { useState } from 'react';

export default function ChatMenu({ setId }: FriendsListProps) {
  const [messageListActive, setMessageListActive] = useState(false);

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
          aria-label="Search database"
          icon={getIcon()}
        />
      </Box>

      {messageListActive ? <ChatMessages setId={setId} /> : <div>Here</div>}
    </div>
  );
}
