import React from 'react';
import {
  Box,
  Flex,
  Image,
  Badge,
  useColorModeValue,
  Tag,
  Avatar,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { Game } from '../../utils/types';
import styled from '@emotion/styled';

interface GameCardProps {
  game: Game;
  handleClick: () => void; //Where to redirect
}

const StyledPara = styled.p`
  color: white;
  text-shadow: 0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black,
    -0.05em -0.05em black, -0.05em 0.05em black, 0.05em -0.05em black,
    0.05em 0.05em black;
`;

export const GameCard = ({ game, handleClick }: GameCardProps) => {
  return (
    <Flex
      bg={'gray.600'}
      padding={'3px'}
      style={{ transition: 'all 250ms ease-in' }}
      // onMouseOver={(e) => {
      //   e.currentTarget.style.backgroundColor = '#F9FAFB';
      // }}
      // onMouseOut={(e) => {
      //   console.log(grayCol);
      //   e.currentTarget.style.backgroundColor = grayCol;
      // }}
      _hover={{ bg: 'teal.600' }}
      rounded={'lg'}
      alignItems="center"
      justifyContent="center"
      onClick={handleClick}
      w={250}
      h={250}
    >
      <Box
        bg={'gray.800'}
        w={350}
        borderWidth={'1px'}
        rounded="md"
        shadow="lg"
        position={'relative'}
      >
        <Image
          src={game.thumbnail}
          cursor={'pointer'}
          alt="Clash Thumbnail"
          rounded="md"
          objectFit={'fill'}
          maxH={'100%'}
        />
        <Box
          pl={'4'}
          // p="4"
          // py={'1'}
          // color={'black'}

          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          position={'absolute'}
          bottom={'8px'}
        >
          <StyledPara>{game.name}</StyledPara>
        </Box>
      </Box>
    </Flex>
  );
};

export const GameCard2 = ({ game, handleClick }: GameCardProps) => {
  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={2}
      style={{ transition: 'all 250ms ease-in' }}
      // onMouseOver={(e) => {
      //   e.currentTarget.style.backgroundColor = '#F9FAFB';
      // }}
      // onMouseOut={(e) => {
      //   console.log(grayCol);
      //   e.currentTarget.style.backgroundColor = grayCol;
      // }}
      _hover={{ bg: 'teal.600' }}
      rounded={'xl'}
      alignItems="center"
      justifyContent="center"
      onClick={handleClick}
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        // minW={250}
        // w={'xs'}
        w={250}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={game.thumbnail}
          cursor="pointer"
          alt={'Clash Thumbnail'}
          roundedTop="lg"
        />

        <Box p="6">
          <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight">
            {game.name}
          </Box>

          {/* <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box> */}

          {/*
          <Box mt="3">
            <Tag size="sm" colorScheme={'facebook'} borderRadius="full">
              <Avatar
                src="https://bit.ly/sage-adebayo"
                size="xs"
                name="Segun Adebayo"
                ml={-1}
                mr={2}
              />
              <TagLabel>Segun</TagLabel>
            </Tag>
          </Box> */}
        </Box>
      </Box>
    </Flex>
  );
};
