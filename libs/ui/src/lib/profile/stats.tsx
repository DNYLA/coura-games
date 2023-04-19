import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Container as ChakraContainer,
} from '@chakra-ui/react';
import { ConvertStats } from '@couragames/shared-types';
import styled from '@emotion/styled';
import StatsCard from './stat-card';
import {
  FcGlobe,
  FcPhone,
  FcPhoneAndroid,
  FcRating,
  FcSelfServiceKiosk,
} from 'react-icons/fc';
import React, { useState } from 'react';
import { BsPerson, BsStar, BsThreeDots } from 'react-icons/bs';
import { MdMusicNote } from 'react-icons/md';

interface UserStatsProps {
  userStats: object;
  rating: number;
  isLoading: boolean;
}

export function UserStats({ userStats, rating, isLoading }: UserStatsProps) {
  const generateStats = () => {
    if (!userStats) return <></>;
    const stats = ConvertStats(userStats);

    return stats.map((stat, i) => (
      <StatsCard
        title={stat.displayText}
        stat={stat.value.toString()}
        icon={<FcSelfServiceKiosk size={'3em'} />}
      />
    ));
  };

  return !isLoading ? (
    <ChakraContainer maxWidth={'7xl'} mt={5} mb={10}>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Rating'}
            stat={rating?.toString()}
            icon={<FcRating size={'3em'} />}
          />
          {generateStats()}
        </SimpleGrid>
      </Box>
    </ChakraContainer>
  ) : (
    <></>
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
