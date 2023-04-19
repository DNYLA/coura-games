import { Container, Flex, Stack } from '@chakra-ui/layout';
import { Box, Collapse, Heading } from '@chakra-ui/react';
import { Game } from '../utils/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GameCard } from '../components/Cards/GameCard';
import Search from '../components/Search';
import HomeSkeleton from '../components/home-skeleton';
import { ConvertStats } from '@couragames/shared-types';
import { UserContext } from '@couragames/ui';

// import HomeSkeletonCards from './card-skeleton';

export function Index() {
  const router = useRouter();
  const { user, login } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

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

  const getFavouriteGames = () => {
    const stats = ConvertStats(user.stats);
    const favouriteGames: Game[] = [];
    stats.forEach((stat) => {
      if (stat.displayText === 'TicTacToe')
        favouriteGames.push(getGameByName('Tic Tac Toe'));
      else if (stat.displayText === 'RPS')
        favouriteGames.push(getGameByName('Rock, Paper, Scissors'));
    });

    return favouriteGames;
  };

  const getGameByName = (name: string) => {
    return games.find((game) => game.name === name);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <Flex direction="column" mt={25}>
      <Flex
        width={'1000px'}
        display={'flex'}
        justifyContent={'center'}
        margin={'0 auto'}
      >
        <Search />
      </Flex>
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
            <HomeSkeleton isLoading={true} amount={6} />
          </Collapse>
        </Stack>
      </Container>
      <Container mt={10} mb={5} minW={'90vw'}>
        <Heading mb={2}>Your Favourites</Heading>
        <Stack direction="row" alignItems="center" overflowX="auto">
          {!isLoading &&
            getFavouriteGames().map((game, i) => (
              <GameCard
                key={i}
                handleClick={() => router.push(`/${game.name}`)}
                game={game}
              />
            ))}
          <Collapse in={isLoading} animateOpacity>
            <HomeSkeleton isLoading={true} amount={4} />
          </Collapse>
        </Stack>
      </Container>
    </Flex>
  );
}

export default Index;
