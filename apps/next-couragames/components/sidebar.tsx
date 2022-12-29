import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useContext } from 'react';
import { GrGamepad } from 'react-icons/gr';
import { MdLeaderboard, MdOutlineLeaderboard } from 'react-icons/md';
import { BsPersonFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import UserContext from 'apps/next-couragames/context/auth';

enum ItemState {
  Any,
  LoggedInOnly,
  LoggedOutOnly,
}

type NavItem = {
  url: string;
  text: string;
  state: ItemState;
};

export default function Sidebar() {
  // const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(UserContext);

  const topNavItems: NavItem[] = [
    {
      url: '/',
      text: 'Play',
      state: ItemState.Any,
    },
    {
      url: '/',
      text: 'Leaderboard',
      state: ItemState.Any,
    },
    {
      url: '/member/',
      text: 'Profile',
      state: ItemState.LoggedInOnly,
    },
    {
      url: '/login/',
      text: 'Sign In',
      state: ItemState.LoggedOutOnly,
    },
    {
      url: '/signup/',
      text: 'Sign Out',
      state: ItemState.LoggedOutOnly,
    },
  ];

  return (
    <StyledSidebar>
      <Link href={'/'}>
        <Title primary>Coura</Title>
      </Link>
      <Link href={'/'}>
        <Title>Games</Title>
      </Link>

      <TopNav>
        {topNavItems.map((item) => {
          if (item.state === ItemState.LoggedInOnly && !user) return;
          if (item.state === ItemState.LoggedOutOnly && user) return;

          if (item.state != ItemState.LoggedOutOnly)
            return (
              <Link href={item.url}>
                <NavButton>
                  <GrGamepad />
                  <span>{item.text}</span>
                </NavButton>
              </Link>
            );

          return (
            <Link href={'/signup'}>
              <AuthButton
              // as={Link}
              // to={'/signup'}
              >
                Sign Up
              </AuthButton>
            </Link>
          );
        })}
        <Link href={'/'}>
          <NavButton>
            <GrGamepad />
            <span>Play</span>
          </NavButton>
        </Link>
        <Link href={'/'}>
          <NavButton>
            <MdLeaderboard />
            <span>Leaderboard</span>
          </NavButton>
        </Link>{' '}
        <Link href={'/'}>
          <NavButton>
            <BsPersonFill />
            <span>Profile</span>
          </NavButton>
        </Link>
      </TopNav>

      <BottomNav>
        <Link href={'/'}>
          <NavButton>
            <BsPersonFill />
            <span>Collapse</span>
          </NavButton>
        </Link>
        <Link href={'/'}>
          <NavButton>
            <AiFillSetting />
            <span>Settings</span>
          </NavButton>
        </Link>
        <Link href={'/'}>
          <NavButton onClick={logout}>
            <BiLogOut />
            <span>Logout</span>
          </NavButton>
        </Link>
      </BottomNav>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
  height: 100vh;
  width: 150px;
  font-family: 'Source Sans Prop', sans-serif;
`;

const NavButton = styled.a`
  display: flex;
  /* justify-content: center; */
  gap: 10px;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  font-size: 18px;
  p {
    float: right;
  }
  svg {
    font-size: 25px;
  }

  :hover {
    background-color: red;
  }
`;

const AuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: white;
  background-color: blue;
  :hover {
    background-color: pink;
  }
`;

const TopNav = styled.div``;
const BottomNav = styled.div``;
const Title = styled.p<{ primary?: boolean }>`
  font-size: 20px;
  font-family: 'Source Sans Prop', sans-serif;
  font-weight: 900;
  text-align: center;
  color: ${(props) => (props.primary ? 'white' : 'hsl(238, 40%, 52%);')};
  cursor: pointer;
`;
