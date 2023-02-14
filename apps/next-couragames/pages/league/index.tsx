import { Leaderboard, LeaderboardType } from '@couragames/shared-types';
import styled from '@emotion/styled';
import LeaderboardItem from './Leaderboard';
import React, { useEffect, useState } from 'react';
import { fetchLeaderboards } from '@couragames/ui';

export default function League() {
  const [data, setData] = useState<Leaderboard[]>(new Array<Leaderboard>());
  const [type, setType] = useState<LeaderboardType>(LeaderboardType.Global);
  useEffect(() => {
    fetchLeaderboards().then((res) => {
      setData(res.data);
    });
  }, []);

  const capitaliseWord = (word: string) => {
    return word[0].toUpperCase() + word.substring(1, word.length);
  };

  const changeType = () => {
    const obj = Object.values(LeaderboardType);
    let index = obj.indexOf(type) + 1;
    if (index === obj.length) index = 0;
    const value = obj.find((_, i) => i === index);
    console.log(value);
    setType(value);
  };

  return (
    <Container>
      <SwitchButton onClick={changeType}>{capitaliseWord(type)}</SwitchButton>
      <Leaderboards>
        {data.map((item, i) => (
          <LeaderboardItem title={item.title} data={item[type]} key={i} />
        ))}
      </Leaderboards>
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Rubik', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 30px;
  /* align-items: center; */
  /* justify-content: center; */
`;

const Leaderboards = styled.div`
  display: flex;
  gap: 50px;
`;

const SwitchButton = styled.button`
  margin-right: 0;
  margin-left: auto;
`;
