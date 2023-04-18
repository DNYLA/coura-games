import styled from '@emotion/styled';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

interface UserStatsProps {
  userStats: object;
  rating: number;
}

type StatInfo = {
  title: string;
  value: string | number;
  previous: string | number;
};
export function UserStats({ userStats, rating }: UserStatsProps) {
  const generateStats = () => {
    if (!userStats) return <></>;
    return Object.keys(userStats).map((stat, i) => (
      <GridItem key={stat}>
        <div className="grid_title">
          <p>{stat}</p>
          {/* <BsThreeDots /> */}
        </div>
        <div className="stat_info">
          <h3>{userStats[stat as keyof typeof userStats] as string}</h3>
          {/* <span>{prevTitle}</span> */}
        </div>
      </GridItem>
    ));
  };

  return (
    <Container>
      {/* <TitleItem>Title Container</TitleItem> */}
      <GridItem>
        <div className="grid_title">
          <p>Rating</p>
          {/* <BsThreeDots /> */}
        </div>
        <div className="stat_info">
          <h3>{rating}</h3>
        </div>
      </GridItem>

      {generateStats()}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  padding: 15px;
  font-family: 'Rubik', sans-serif;
  grid-template-columns: repeat(3, 1fr);
  background-color: hsl(226, 43%, 10%);
  margin-top: 30px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
  /* padding-top: 0px; */
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  min-height: 125px;
  margin: 10px 15px;
  background-color: hsl(235, 46%, 20%);
  color: white;
  border-radius: 20px;
  justify-content: space-between;
  /* gap: 25px; */

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
