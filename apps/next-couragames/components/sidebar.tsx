import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useContext } from 'react';
import { GrGamepad } from 'react-icons/gr';
import { BsArrowBarLeft, BsBoxArrowLeft } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { FcBusinessman, FcConferenceCall, FcRating } from 'react-icons/fc';
import UserContext from '../context/auth';
import { IconType } from 'react-icons';
import { FaCog } from 'react-icons/fa';

enum ItemState {
  Any,
  LoggedInOnly,
  LoggedOutOnly,
}

type NavItem = {
  url: string;
  text: string;
  state: ItemState;
  primary?: boolean;
  icon?: IconType;
};

export default function Sidebar() {
  // const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(UserContext);

  const topNavItems: NavItem[] = [
    {
      url: '/',
      text: 'Play',
      state: ItemState.Any,
      icon: FcConferenceCall,
    },
    {
      url: '/',
      text: 'League',
      state: ItemState.Any,
      icon: FcRating,
    },
    {
      url: user ? `/member/${user.username}` : '/login/',
      text: 'Profile',
      state: ItemState.LoggedInOnly,
      icon: FcBusinessman,
    },
    {
      url: '/signup/',
      text: 'Sign Up',
      state: ItemState.LoggedOutOnly,
    },
    {
      url: '/login/',
      text: 'Log In',
      state: ItemState.LoggedOutOnly,
      primary: true,
    },
  ];

  const generateItems = (list: NavItem[]) => {
    return list.map((item) => {
      if (item.state === ItemState.LoggedInOnly && !user) return;
      if (item.state === ItemState.LoggedOutOnly && user) return;

      if (item.state != ItemState.LoggedOutOnly)
        return (
          <Link href={item.url}>
            <item.icon />
            <span>{item.text}</span>
          </Link>
        );

      return (
        <Link href={item.url} key={item.text} legacyBehavior>
          <AuthButton
            primary={item.primary}
            // as={Link}
            // to={'/signup'}
          >
            {item.text}
          </AuthButton>
        </Link>
      );
    });
  };

  return (
    <StyledSidebar>
      <Link href={'/'} legacyBehavior>
        <>
          <Title primary>Coura</Title>
          <Title>Games</Title>
        </>
      </Link>

      <TopNav>{generateItems(topNavItems)}</TopNav>

      {user && (
        <BottomNav>
          <Link href={'/'}>
            <BsArrowBarLeft />
            <span>Collapse</span>
          </Link>

          <Link href={'/settings'}>
            <FaCog />
            <span>Settings</span>
          </Link>

          <Link href={'/'}>
            <AltButton onClick={logout}>
              <BiLogOut />
              <span>Logout</span>
            </AltButton>
          </Link>
        </BottomNav>
      )}
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  align-self: auto;
  flex-direction: column;
  background-color: #2c2c2c;
  height: 100vh;
  width: 150px;
  font-family: 'Source Sans Prop', sans-serif;
`;

const NavButton = styled.a`
  display: flex;
  /* justify-content: center; */
  text-align: center;
  width: 100%;
  gap: 10px;
  align-items: center;
  padding: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 18px;
  p {
    float: right;
  }
  svg {
    font-size: 25px;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const AltButton = styled.a`
  display: flex;
  width: 100%;
  text-align: right;
  /* justify-content: center; */
  text-align: center;
  gap: 10px;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  font-size: 18px;

  span {
    display: inline;

    text-align: center;
    float: right;
  }
  /* svg {
    font-size: 25px;
  } */

  :hover {
    background-color: rgba(0, 0, 0, 0.3);

    span {
      color: white;
      text-align: right;
    }
  }

  color: hsla(255, 100%, 100%, 0.5);
  /* color: hsla(238, 40%, 52%, 0.2); */
`;

const AuthButton = styled.button<{ primary: boolean }>`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: white;
  background-color: ${(props) =>
    props.primary ? 'hsl(238, 40%, 52%)' : '#383633'};
  /* height: 30px; */
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  margin-top: 5px;
  /* cursor: pointer; */
  :hover {
    background-color: hsl(211, 10%, 45%);
  }
`;

const TopNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 5px; */

  a {
    display: flex;
    /* justify-content: center; */
    text-align: center;
    width: 100%;
    gap: 10px;
    align-items: center;
    padding: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 18px;
    p {
      float: right;
    }
    svg {
      font-size: 25px;
    }

    :hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;
const BottomNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;

  a {
    display: flex;
    width: 100%;
    text-align: right;
    /* justify-content: center; */
    text-align: center;
    gap: 10px;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    font-size: 18px;

    span {
      display: inline;

      text-align: center;
      float: right;
    }
    /* svg {
    font-size: 25px;
  } */

    :hover {
      background-color: rgba(0, 0, 0, 0.3);

      span {
        color: white;
        text-align: right;
      }
    }

    color: hsla(255, 100%, 100%, 0.5);
  }
`;
const Title = styled.p<{ primary?: boolean }>`
  font-size: 20px;
  font-family: 'Source Sans Prop', sans-serif;
  font-weight: 900;
  text-align: center;
  color: ${(props) => (props.primary ? 'white' : 'hsl(238, 40%, 52%);')};
  cursor: pointer;
`;
