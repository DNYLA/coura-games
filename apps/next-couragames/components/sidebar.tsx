import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Link href={'/'}>
        <Title primary>Coura</Title>
      </Link>

      <Link href={'/'}>
        <Title>Games</Title>
      </Link>
      <TopNav>
        <div>Play</div>
        <p>Leave</p>
      </TopNav>

      <BottomNav>
        <p>Collapse</p>
        <p>Settings</p>
        <p>Logout</p>
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

const TopNav = styled.div``;
const BottomNav = styled.div`
  margin-bottom: auto;
`;
const Title = styled.p<{ primary?: boolean }>`
  font-size: 20px;
  font-family: 'Source Sans Prop', sans-serif;
  font-weight: 900;
  text-align: center;
  color: ${(props) => (props.primary ? 'white' : 'hsl(238, 40%, 52%);')};
  cursor: pointer;
`;
