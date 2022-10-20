import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Icon, WarningIcon } from '@chakra-ui/icons';
export default function Chat() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {};

  const hide = {
    display: 'none',
  };

  const show = {
    display: 'block',
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <ChatBox>
      <Container style={isOpen ? show : hide} onClick={toggle}>
        <Header>
          <FontAwesomeIcon icon={faChevronLeft} style={{ padding: '0' }} />
          {/* <Icon as={faChevronLeft} /> */}
          <h1>This is the chat</h1>
        </Header>
        <div>Messages</div>
        <div>Enter Text...</div>
      </Container>
      <Popup onClick={toggle} style={isOpen ? hide : {}}>
        <span>Chat (5)</span>
        <span>X</span>
      </Popup>
    </ChatBox>
  );
}

const ChatBox = styled.div`
  /* display: none; */
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
`;

const Popup = styled.div`
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

const Container = styled.div`
  background-color: #555;
  width: 250px;
  height: 300px;
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

const Header = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  /* flex-direction: row; */
`;
