import {
  Leaderboard,
  LeaderboardType,
  LeagueTable,
} from '@couragames/shared-types';
import styled from '@emotion/styled';
import LeaderboardItem from './Leaderboard';
import React, { useEffect, useState } from 'react';
import { fetchLeaderboards } from '@couragames/ui';

export default function League() {
  const [league, setLeague] = useState<LeagueTable>();
  const [type, setType] = useState<LeaderboardType>(LeaderboardType.Global);

  useEffect(() => {
    fetchLeaderboards().then((res) => {
      setLeague(res.data);
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
        {league &&
          Object.keys(league.data).map((key, i) => (
            <LeaderboardItem
              title={league.data[key].title}
              data={league.data[key][type]}
              users={league.users}
              key={i}
            />
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
