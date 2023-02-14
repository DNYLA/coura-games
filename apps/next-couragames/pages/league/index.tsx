import { Leaderboard } from '@couragames/shared-types';
import styled from '@emotion/styled';
import LeaderboardItem from './Leaderboard';
import React, { useEffect, useState } from 'react';
import { fetchLeaderboards } from '@couragames/ui';

export default function League() {
  const [data, setData] = useState<Leaderboard[]>();

  useEffect(() => {
    fetchLeaderboards().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Container>
      {data && (
        <>
          <LeaderboardItem data={data[0]} />
          <LeaderboardItem data={data[1]} />
        </>
      )}
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
