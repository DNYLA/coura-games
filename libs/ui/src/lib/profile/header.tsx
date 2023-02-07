import { PublicUser } from '@couragames/shared-types';
import styled from '@emotion/styled';
import UserContext from '../context/auth';
import SettingsModal from './SettingsModal';
import moment from 'moment';
import { useContext, useState } from 'react';
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
import { useDisclosure } from '@chakra-ui/react';
interface HeaderProps {
  member: PublicUser;
  selfName: string;
}

enum ButtonType {
  Success,
  Negative,
  INFO,
}

const typeToColor = (type: ButtonType) => {
  switch (type) {
    default:
      return '#000';
    case ButtonType.Success:
      return 'hsl(123, 40%, 52%)';
    case ButtonType.Negative:
      return 'hsl(0, 42%, 52%)';
    case ButtonType.INFO:
      return 'hsl(205, 42%, 52%)';
  }
};

const ActionSettings = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  padding: 15px 15px;
`;

const ActionButton = styled.button<{ action: ButtonType }>`
  display: flex;
  height: 20px;
  align-items: center;
  background: ${(props) => typeToColor(props.action)};
  color: white;
  border-radius: 5px;
  padding: 25px;
  cursor: pointer;

  :hover {
    /* background-color: #6d87a2; */
    background-color: hsl(211, 10%, 45%);
  }
`;

export function ProfileHeader({ member, selfName }: HeaderProps) {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log('In Member Profile');
  console.log(user);

  const isUser = selfName.toLowerCase() === member.username.toLowerCase();

  return (
    <>
      <SettingsModal
        open={isOpen}
        onClose={onClose}
        avatarURL={member.avatarUrl}
      />
      <Container>
        <Avatar>
          <img src={member.avatarUrl} alt="Member's Avatar" />
        </Avatar>

        <ActionSettings>
          {!isUser && (
            <>
              <ActionButton action={ButtonType.Negative}>
                <ImBlocked />
              </ActionButton>
              <ActionButton action={ButtonType.Success}>
                <AiOutlineUserAdd />
              </ActionButton>
            </>
          )}
          {isUser && (
            <ActionButton action={ButtonType.INFO} onClick={onOpen}>
              <AiFillEdit style={{ cursor: 'pointer' }} />
            </ActionButton>
          )}
        </ActionSettings>

        <Content>
          <h2>{member.username}</h2>
          <p>{member.status}</p>
        </Content>

        <Info>
          <Item>
            <h3>Points</h3>
            <p>{member.points}</p>
          </Item>
          {/* <StatItem>
          <h3>Leagues</h3>
          <p>25</p>
        </StatItem>{' '} */}
          <Item>
            <h3>Followers</h3>
            <p>33</p>
          </Item>
          <Item>
            <h3>Joined</h3>
            <p>{moment(member.joined).format('MMM Do, YYYY')}</p>
          </Item>
        </Info>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: white;
  color: black;
  padding-bottom: 15px;
  border-radius: 8px;

  .settings {
    /* width: 25px; */
    /* height: 25px; */
    display: flex;
    justify-content: end;
    padding: 15px 15px;
  }
`;

const Avatar = styled.div`
  /* width: 500px; */
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 5px solid white;
    object-fit: cover;
    margin-bottom: -70px;
  }
`;

const Content = styled.div`
  padding: 32px;
  text-align: center;

  h2 {
    margin-top: 8px;
    font-size: 20px;
    font-weight: 500;
    color: hsl(229, 23%, 23%);
  }

  p {
    font-size: 15px;
    opacity: 60%;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  min-width: 100px;
  margin: 0px 30px;
  text-align: center;

  h3 {
    font-weight: 500;
  }
`;
