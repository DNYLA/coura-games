import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const ChatContainer = styled.div`
  background-color: #555;
  width: 250px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.75;
  position: fixed;
  bottom: 15px;
  right: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
`;

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {};

  return (
    <Box zIndex={15}>
      <ChatContainer>
        <span>Chat</span>
        <span>X</span>
      </ChatContainer>

      <Box onClick={handleOpen}>This is the chat</Box>
    </Box>
  );
}
