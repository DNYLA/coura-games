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
    <Container>
      <MessageLog>
        {messages.map((msg) => (
          <IndividualMessage
            content={msg.content}
            name={msg.sender ? user.name : user2.name}
            avatar={msg.sender ? user.avatar : user2.avatar}
            sender={msg.sender}
          />
        ))}
      </MessageLog>
      <InputBox type="text" name="name" placeholder="Enter message..." />
    </Container>
  );
}

const InputBox = styled.input`
  width: 90%;
  height: 30px;
  margin: 5px;
  border-radius: 5px;
  font-size: 15px;
  padding: 5px;
  :focus {
    outline: 0;
    border: 1px solid #161819;
  }

  border: 1px solid #141617;

  transition: all 300ms ease-in;
`;

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-around; */
`;

const MessageLog = styled.div`
  display: flex;
  flex-direction: column;
`;
interface MessageProps {
  name: string;
  content: string;
  avatar: string;
  sender: boolean;
}
function IndividualMessage({ content, sender }: MessageProps) {
  return (
    <MessageCon>
      <MessageBox sender={sender}>
        <span>{content}</span>
      </MessageBox>
    </MessageCon>
  );
}

const MessageCon = styled.div`
  display: inline-block;
  /* display: flex; */
  /* flex-direction: column; */
`;

const MessageBox = styled.div<{ sender: boolean }>`
  padding: 5px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.sender ? '#00000033' : '#1f94e0')};
  border-radius: 10px;
  span {
    padding: 5px;
  }
`;
