import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faClose,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { FaChevronLeft } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import {
  Avatar,
  AvatarBadge,
  Button,
  Collapse,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  WrapItem,
} from '@chakra-ui/react';
import SocketContext from '../../context/socket';
import {
  ChatData,
  PartialInbox,
  ReceivedNotification,
  User,
} from '@couragames/shared-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import { NotificationStatus, NotificationType } from '@prisma/client';
import { useRouter } from 'next/router';

export default function Notifications() {
  const [notifications, setNotifications] = useState<ReceivedNotification[]>(
    []
  );
  const [eventsHandled, setEventsHandled] = useState(false);

  const socket = useContext(SocketContext).socket;
  const router = useRouter();

  const handleNotification = useCallback(
    (notification: ReceivedNotification) => {
      const tempNotifs = [...notifications];
      tempNotifs.unshift(notification);
      setNotifications(tempNotifs);

      toast.info(notification.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // onClick: () => {
        //   handleClick(notification);
        // },
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });
    },
    []
  );

  useEffect(() => {
    if (!notifications) socket.emit('request_notifications');
    if (eventsHandled) return;

    socket?.on('notification', (notification: ReceivedNotification) => {
      handleNotification(notification);
    });

    setEventsHandled(true);
  }, [socket, eventsHandled, notifications, handleNotification]);

  const handleClick = (notif: ReceivedNotification) => {
    if (notif.action) router.push(notif.action);
  };

  return (
    <>
      <TitleContainer>
        {notifications.map((notif, i) => (
          <Box
            key={i}
            display={'flex'}
            alignContent={'center'}
            alignItems={'center'}
            padding={'5px'}
            border={'1px solid rgba(0,0,0,0.2)'}
            backdropBlur={'2xl'}
            backgroundColor={'rgba(0,0,0,0.05)'}
            borderRadius={'5px'}
            width={'100%'}
            _hover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            cursor={'pointer'}
            onClick={() => handleClick(notif)}
          >
            <WrapItem>
              <Avatar
                size={'sm'}
                name={notif.fromUser.username}
                src={notif.fromUser.avatarUrl}
              />
            </WrapItem>
            <Box display={'flex'} flexFlow={'column'} padding={'1px'}>
              <span style={{ fontWeight: '500', fontSize: '12px' }}>
                {notif.message}
              </span>
              <span
                style={{
                  fontSize: '10px',
                }}
              >
                {moment(notif.createdAt).fromNow()}
              </span>
            </Box>
          </Box>
        ))}
      </TitleContainer>
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
  p {
    margin-left: 60px;
  }
`;
