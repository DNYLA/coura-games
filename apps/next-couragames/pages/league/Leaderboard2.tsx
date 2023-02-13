import { Avatar, Icon, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { BsTrophyFill } from 'react-icons/bs';
import { GiDiamondTrophy, GiLaurelsTrophy, GiQueenCrown } from 'react-icons/gi';
export default function AlternativeLeaderboard() {
  const { title, values } = {
    title: 'Memory Game',
    values: 'Memory Game',
  };

  const renderItem = (name: string, index: number) => {
    let icon;

    if (index === 0) {
      icon = <Icon as={GiLaurelsTrophy} w={8} h={8} color="orange.300" />;
    } else if (index === 1) {
      // icon = <
      icon = <Icon as={BsTrophyFill} w={8} h={8} color="#a19d94" />;
    } else if (index === 2) {
      icon = <Icon as={BsTrophyFill} w={8} h={8} color="orange.500" />;
    }

    return (
      <Item>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        {/* <p>Player {name}</p> */}
        <Link href="/member/dan" className="link">
          <Text noOfLines={1}>Player {name}</Text>
        </Link>

        {icon}
      </Item>
    );
  };

  return (
    <Container>
      <Header>
        <h3>{title}</h3>
      </Header>
      <Stats>
        {['One One One One', 'Two', 'Three', 'Four'].map((p, i) =>
          renderItem(p, i)
        )}
      </Stats>
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  height: 500px;
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
  gap: 15%;

  p {
    font-size: 15px;
  }
  .link {
    color: #69badd;

    :hover {
      color: #3ba2ce;
      /* text-decoration: underline; */
    }
  }
`;
