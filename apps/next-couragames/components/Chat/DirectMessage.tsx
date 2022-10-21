import { Avatar, Box, Flex, WrapItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { send } from 'process';

interface DirectMessageProps {
  id: string;
  lastMessage: string;
}

type Message = {
  content: string;
  sender: boolean; //Indicates if the current user is the sender or receipient
};

export default function DirectMessage({ id, lastMessage }: DirectMessageProps) {
  const user = {
    name: id,
    lastMessage: lastMessage,
    online: true,
    avatar: 'https://i.scdn.co/image/ab6761610000e5eb9c30c6b69a55d48decd71600',
  };

  const user2 = {
    name: 'Barbara',
    lastMessage: 'want to play a game?',
    online: false,
    avatar:
      'https://i1.sndcdn.com/artworks-QEVOnOm6VJ04F5Rp-1fEbAA-t500x500.jpg',
  };

  const messages: Message[] = [
    {
      content: 'Hello!',
      sender: false,
    },
    {
      content: 'hi',
      sender: true,
    },
    {
      content: 'Invite Me  a ',
      sender: true,
    },
  ];

  return (
    <Box>
      {messages.map((msg, i) => (
        <IndividualMessage
          key={i}
          content={msg.content}
          name={msg.sender ? user.name : user2.name}
          avatar={msg.sender ? user.avatar : user2.avatar}
          sender={msg.sender}
        />
      ))}
    </Box>
  );
}
interface MessageProps {
  name: string;
  content: string;
  avatar: string;
  sender: boolean;
}
function IndividualMessage({ content, name, avatar, sender }: MessageProps) {
  return (
    <Flex>
      <MessageBox>
        <span>{content}</span>
      </MessageBox>
    </Flex>
  );
}

const MessageBox = styled.div`
  padding: 5px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  span {
    padding: 5px;
  }
`;
