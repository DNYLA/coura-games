import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { Collapse, useDimensions, useDisclosure } from '@chakra-ui/react';
import FriendsList from 'apps/next-couragames/components/Chat/friends-list';

function DirectMessage() {
  return <Box>This is a DM</Box>;
}

export default function Chat() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  const { isOpen, onToggle } = useDisclosure();
  const [chatId, setChatId] = useState(null);

  const hide = {
    display: 'none',
  };

  const show = {
    display: 'block',
  };

  // const toggle = () => setIsOpen(!isOpen);
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

  console.log(dimensions);
  return (
    <ChatBox>
      {/* <SlideFade in={isOpen} offsetY={'0px'} offsetX={'0px'}> */}
      <Collapse in={isOpen} animateOpacity>
        <Container ref={elementRef} style={isOpen ? show : hide}>
          <Header onClick={onToggle}>
            {chatId ? (
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setChatId(null);
                }}
              />
            ) : (
              <FontAwesomeIcon icon={faChevronLeft} style={{ opacity: '0%' }} />
            )}
            {/* <Icon as={faChevronLeft} /> */}
            <h1 style={{ fontWeight: '600' }}>{chatId ?? 'Chat'}</h1>
            <FontAwesomeIcon icon={faClose} style={{ cursor: 'pointer' }} />
            {/* <FontAwesomeIcon icon={faCircleXmark} style={{}} /> */}
          </Header>
          <Box h={'calc(100% - 35px)'}>
            {chatId ? <DirectMessage /> : <FriendsList setId={setChatId} />}
          </Box>
          <Box></Box>
        </Container>
      </Collapse>
      {/* </SlideFade> */}

      <Popup onClick={onToggle} style={isOpen ? hide : {}}>
        <span>Chat</span>
        <FontAwesomeIcon icon={faClose} style={{ cursor: 'pointer' }} />
      </Popup>
    </ChatBox>
  );
}

const ChatBox = styled.div`
  /* display: none; */
  position: fixed;
  bottom: 0;
  right: 15px;
  /* border: 3px solid #f1f1f1; */
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
  align-items: center;
  font-weight: 500;
`;

const Container = styled.div`
  background-color: #555;
  width: 250px;
  height: 300px;
  border-radius: 5px;
  /* cursor: pointer; */
  opacity: 0.75;
  position: fixed;
  bottom: 15px;
  right: 10px;
  /* padding: 10px 15px; */
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-flow: row;
  /* display: inline-block; */
  justify-content: space-between;
  padding: 3px 10px;
  /* flex-direction: row; */
  height: 35px;
  align-items: center;
  border-bottom: 1px solid;
  box-shadow: 1px;
  h1 {
    padding: 0;
    margin: 0;
    line-height: '50px';
    vertical-align: middle;
  }
`;
