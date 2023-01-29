import styled from '@emotion/styled';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
interface UserStatsProps {
  name: string;
}

type StatInfo = {
  title: string;
  value: string | number;
  previous: string | number;
};
export function UserStats() {
  const [prevTitle, setPrevTitle] = useState('Last Week -');
  const stats: StatInfo[] = [
    {
      title: 'Rating',
      value: '386',
      previous: 286,
    },
    {
      title: 'Time',
      value: '32 hrs',
      previous: '36 hrs',
    },
    {
      title: 'Total Games',
      value: 815,
      previous: 32,
    },
    {
      title: 'Tic Tac Toe',
      value: '46 wins',
      previous: '18 wins',
    },
    {
      title: 'Memory Game',
      value: '15 wins',
      previous: '25 wins',
    },
    {
      title: 'Connect Four',
      value: '12 wins',
      previous: '50 wins',
    },
  ];

  return (
    <Container>
      <TitleItem>Title Container</TitleItem>
      {stats.map((stat) => (
        <GridItem>
          <div className="grid_title">
            <p>{stat.title}</p>
            {/* <BsThreeDots /> */}
          </div>
          <div className="stat_info">
            <h3>{stat.value}</h3>
            <span>
              {prevTitle} {stat.previous}
            </span>
          </div>
        </GridItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  padding: 15px;
  font-family: 'Rubik', sans-serif;
  grid-template-columns: repeat(4, 1fr);
  background-color: hsl(226, 43%, 10%);
  margin-top: 30px;
  border-radius: 10px;
  /* padding-top: 0px; */
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  min-height: 155px;
  margin: 10px 15px;
  background-color: hsl(235, 46%, 20%);
  color: white;
  border-radius: 20px;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
  p {
    font-size: 16px;
    font-weight: 400;
  }

  h3 {
    font-size: 32px;
    font-weight: 400;
    margin: 0;
    margin-left: 4px;
  }

  span {
    font-size: 12px;
    color: hsl(235, 45%, 61%);
    padding: 0;
  }

  .stat_info {
    margin-bottom: 10px;
  }

  .grid_title {
    display: flex;
    justify-content: space-between;
  }
`;

const TitleItem = styled(GridItem)`
  background-color: hsl(235, 45%, 61%);
  grid-row: 1 / 3;
`;
