import { Avatar, Icon, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { BsTrophyFill } from 'react-icons/bs';
import { GiLaurelsTrophy } from 'react-icons/gi';
import {
  Leaderboard as LeaderboardType,
  LeaderboardStat,
  User,
} from '@couragames/shared-types';
interface LeaderboardProps {
  title: string;
  data: LeaderboardStat[];
  users: User[];
}

export default function Leaderboard({ title, data, users }: LeaderboardProps) {
  const renderItem = (player: LeaderboardStat, index: number) => {
    const { username, points } = player;
    const user = users.find((user) => user.username === player.username);
    let icon: ReactElement;

    if (index === 0) {
      icon = <Icon as={GiLaurelsTrophy} w={8} h={8} color="orange.300" />;
    } else if (index === 1) {
      // icon = <
      icon = <Icon as={BsTrophyFill} w={8} h={8} color="#a19d94" />;
    } else if (index === 2) {
      icon = <Icon as={BsTrophyFill} w={8} h={8} color="orange.500" />;
    } else {
      icon = (
        <Text w={8} h={8} className="iconText">
          {index + 1}
        </Text>
      );
    }

    return (
      <Item>
        {/* <p>Player {name}</p> */}
        {icon}

        <Link href={`/member/${username}`} className="link">
          <Avatar name={username} src={user.avatarUrl} width={10} h={10} />
          <Text noOfLines={1} title={username}>
            {username}
          </Text>
        </Link>

        <span>{points}</span>
      </Item>
    );
  };

  console.log(data);

  return (
    <Container>
      <Header>
        <h3>{title}</h3>
      </Header>
      <Stats>
        {data.length === 0 && <span>No Data To Available</span>}
        {data.map((player, i) => renderItem(player, i))}
      </Stats>
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  height: 100%;
  /* height: 500px; */
  background-color: #292929;
  font-family: 'Rubik', sans-serif;
`;

const Header = styled.div`
  width: 100%;
  background-color: #2c2c2c;
  border-bottom: 1px solid white;
  h3 {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
`;

const Stats = styled.div`
  text-align: center;
  font-size: 18px;
  /* margin-top: 15px; */
  /* gap: 0px; */
`;
const Item = styled.div`
  padding: 10px;
  /* margin-bottom: 5px; */
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  /* justify-content: space-evenly; */
  text-align: center;
  align-items: center;
  /* background-color: lightgray; */
  /* gap: 15%; */
  p {
    font-size: 15px;
  }

  span {
    margin-left: auto;
    margin-right: 0;
  }

  .iconText,
  svg {
    /* margin-left: 0; */
    /* margin-right: auto; */
    margin-right: 20px;
  }

  .link {
    color: #69badd;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 15px;

    span {
      /* margin-left: 0; */
      /* margin-right: auto; */
    }

    p {
      width: 75px;
    }

    :hover {
      color: #3ba2ce;
      /* text-decoration: underline; */
    }
  }
`;
