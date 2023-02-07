import { Center, Container, Flex, HStack, Stack } from '@chakra-ui/layout';
import {
  Collapse,
  Heading,
  ScaleFade,
  Slide,
  SlideFade,
} from '@chakra-ui/react';
import UserContext from '../context/auth';
import { Game } from '../utils/types';
import { Router } from 'express';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { GameCard } from '../components/Cards/GameCard';

// import HomeSkeletonCards from './card-skeleton';

export function Index() {
  const router = useRouter();
  // const { user, login } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [games, setGames] = useState<Game[]>([
    {
      name: 'Rock, Paper, Scissors',
      link: 'rock-paper-scissors',
      thumbnail:
        'https://projects-static.raspberrypi.org/projects/rock-paper-scissors/05a38c3b2fa6deb8fe4ccd505b5e7c65bda28e2f/en/images/rock-paper-scissors.png',
      currentPlayers: 5,
      new: false,
    },
    {
      name: 'Tic Tac Toe',
      link: 'tic-tac-toe',
      thumbnail: 'https://miro.medium.com/max/790/1*mIjIjWIUc45MQjLDVkOC-w.png',
      currentPlayers: 35,
      new: true,
    },
  ]);

  // useEffect(() => {
  //   getClashes(true, true).then(({ data }) => {
  //     console.log(data);
  //     setLists(data);
  //     setTimeout(() => setIsLoading(false), 1500);
  //   });
  // }, []);

  return (
    <Flex direction="column" mt={25}>
      <Container mb={5} minW={'90vw'}>
        <Heading mb={2}>Popular</Heading>
        <Stack direction="row" alignItems="center" overflowX="auto">
          {!isLoading &&
            games.map((game: Game, i) => (
              <GameCard
                key={i}
                handleClick={() => router.push(`play/${game.link}`)}
                game={game}
              />
            ))}
          <Collapse in={isLoading} animateOpacity>
            <div>Loading...</div>
            {/* <HomeSkeletonCards isLoading={true} amount={6} /> */}
          </Collapse>
        </Stack>
      </Container>
      <Container mt={10} mb={5} minW={'90vw'}>
        <Heading mb={2}>Recently Created</Heading>
        <Stack direction="row" alignItems="center" overflowX="auto">
          {!isLoading &&
            games
              .filter((g) => g.new === true)
              .map((game, i) => (
                <GameCard
                  key={i}
                  handleClick={() => router.push(`/${game.name}`)}
                  game={game}
                />
              ))}
          {/* <Collapse in={isLoading} animateOpacity>
            <HomeSkeletonCards isLoading={true} amount={6} />
          </Collapse> */}
        </Stack>
      </Container>
    </Flex>
  );
}

export default Index;
