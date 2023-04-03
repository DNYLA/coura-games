import { PartialInbox } from '@couragames/shared-types';
import { UserContext } from '@couragames/ui';
import styled from '@emotion/styled';
import SocketContext from '../../context/socket';
import { useContext, useState } from 'react';

interface DirectMessageProps {
  id: string;
  inbox?: PartialInbox;
}

type Message = {
  content: string;
  sender: boolean; //Indicates if the current user is the sender or receipient
};

export default function DirectMessage({ id, inbox }: DirectMessageProps) {
  const [newMessageContent, setNewMessageContent] = useState('');
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext).socket;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('emitting');
      socket?.emit('submit_chat_message', {
        targetUser: id,
        content: newMessageContent,
      });
      setNewMessageContent('');
    }
  };

  return (
    <Container>
      <MessageLog>
        {inbox &&
          inbox.messages.map((msg, i) => (
            <IndividualMessage
              content={msg.content}
              name={msg.userId === user.id ? user.username : id}
              avatar={
                msg.userId === user.id ? user.avatarUrl : inbox.user.avatarUrl
              }
              sender={msg.userId === user.id}
              key={msg.id}
            />
          ))}
      </MessageLog>
      <InputBox
        type="text"
        name="name"
        placeholder="Enter message..."
        value={newMessageContent}
        onChange={(e) => setNewMessageContent(e.target.value)}
        onKeyUp={handleKeyPress}
      />
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
