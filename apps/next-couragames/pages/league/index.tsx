import styled from '@emotion/styled';
import Leaderboard from 'apps/next-couragames/pages/league/Leaderboard';
import AlternativeLeaderboard from 'apps/next-couragames/pages/league/Leaderboard2';
import React from 'react';

export default function League() {
  return (
    <Container>
      <Leaderboard />
      <AlternativeLeaderboard />
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Rubik', sans-serif;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  margin: 30px;
  gap: 50px;
  /* align-items: center; */
  /* justify-content: center; */
`;
