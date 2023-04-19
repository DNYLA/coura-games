import React from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Badge,
  Button,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export type Track = {
  position: number;
  title: string;
  artist: string;
  length: string;
  youtubeUrl: string;
  setId: number;
};
interface ListCardProps {
  track: Track;
}

export const ListCard = ({ track }: ListCardProps) => {
  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={0.5}
      rounded="lg"
      width={'100%'}
      alignItems="center"
      justifyContent="center"
      mb={2}
    >
      <Flex
        // maxW="md"
        mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        width={'100%'}
        minH={115}
      >
        <Box
          w={1 / 3}
          bgSize="cover"
          // style={{
          //   backgroundImage: `url('${getYoutubeThumbnail(track.youtubeUrl)}')`,
          // }}
        ></Box>

        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
          <chakra.h1
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            {track.title}
          </chakra.h1>

          <Flex mt={0} alignItems="center" justifyContent="space-between">
            <chakra.p
              mt={2}
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              by {track.artist}
              <Badge rounded="full" px="2" colorScheme="teal" ml={3}>
                2:15
              </Badge>
              <Badge rounded="full" px="2" colorScheme="red" ml={3}>
                Youtube
              </Badge>
            </chakra.p>
            {/* <chakra.button
              px={2}
              py={1}
              bg="white"
              fontSize="xs"
              color="gray.900"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: 'gray.200',
              }}
              _focus={{
                bg: 'gray.400',
              }}
            >
              Youtube
            </chakra.button> */}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
