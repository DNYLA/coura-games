import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faClose,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { BsChatFill, BsFillChatLeftFill } from 'react-icons/bs';
import {
  Collapse,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import FriendsList from '../Chat/friends-list';
import DirectMessage from '../Chat/DirectMessage';

export default function Chat2() {
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

  return (
    <ChatBox>
      {/* <SlideFade in={isOpen} offsetY={'0px'} offsetX={'0px'}> */}
      <Collapse in={isOpen} animateOpacity>
        <Container ref={elementRef} style={isOpen ? show : hide}>
          <Tabs isFitted={true}>
            <TabContainer>
              <TabList width={'100%'}>
                <Tab>Chat</Tab>
                <Tab>Notification</Tab>
              </TabList>
              <FontAwesomeIcon
                icon={faClose}
                style={{ cursor: 'pointer' }}
                onClick={onToggle}
              />
            </TabContainer>

            <TabPanels>
              <TabPanel padding={1}>
                {/* <FontAwesomeIcon
                  icon={faClose}
                  style={{ cursor: 'pointer' }}
                  onClick={onToggle}
                /> */}
                {/* <FontAwesomeIcon icon={faCircleXmark} style={{}} /> */}
                <Box h={'calc(100% - 35px)'}>
                  {chatId ? (
                    <DirectMessage
                      id={chatId}
                      lastMessage={'Invite me to a lobby'}
                    />
                  ) : (
                    <FriendsList setId={setChatId} />
                  )}
                </Box>
                <Box></Box>
              </TabPanel>
              <TabPanel>
                <p>Notificaitions</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* <Icon as={faChevronLeft} /> */}
        </Container>
      </Collapse>
      {/* </SlideFade> */}
      <Popup onClick={onToggle} style={isOpen ? hide : {}}>
        <FontAwesomeIcon
          icon={faMessage}
          style={{ cursor: 'pointer' }}
          size={'2x'}
          onClick={onToggle}
        />
      </Popup>
    </ChatBox>
  );
}

const TabContainer = styled.div`
  display: flex;
  width: 100%;

  svg {
    padding: 5px 8px;
    justify-content: center;
    align-items: center;
  }
`;

const ChatBox = styled.div`
  /* display: none; */
  position: fixed;
  bottom: 150px;
  right: 15px;
  /* border: 3px solid #f1f1f1; */
  z-index: 9;
`;

const Popup = styled.div`
  background-color: #555;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.75;
  position: fixed;
  bottom: 15px;
  right: 60px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  svg {
    width: 100%;
  }
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
  right: 50px;
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
