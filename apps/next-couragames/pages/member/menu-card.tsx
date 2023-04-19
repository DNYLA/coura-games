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
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Track } from './test-component';
export type GameInfo = {
  rating: number;
  reviewCount: number;
  playersCount: number;
};
interface MenuCardProps {
  clash: Clash;
  extraInfo: GameInfo; //Extra Info is Info that should be in the clash but has not been develoepd yet.
  handleClick: () => void;
}

export type Clash = {
  id: number;
  title: string;
  creatorId: number;
  createdAt: Date;
  updatedAt?: Date;
  bannerImg: string;
  thumbnail: string;
  TrackSet: TrackSet[];
};

export type TrackSet = {
  id: number;
  clashId: number;
  title: string;
  tracks: Track[];
  _count: { tracks: number };
};

export const MenuCard = ({ clash, extraInfo, handleClick }: MenuCardProps) => {
  const songAmount =
    clash.TrackSet[0]._count.tracks + clash.TrackSet[0]._count.tracks;

  const newLimit = new Date();
  const createdAt = new Date(clash.createdAt);
  newLimit.setDate(newLimit.getDate() - 7);

  const grayCol = useColorModeValue('#F9FAFB', 'gray.600');

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
          src={clash.thumbnail}
          cursor="pointer"
          alt={'Clash Thumbnail'}
          roundedTop="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {createdAt > newLimit && (
              <Badge rounded="full" px="2" colorScheme="teal" mr={2}>
                New
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              // ml="2"
            >
              {songAmount} songs &bull; {extraInfo.playersCount} players
            </Box>
          </Box>

          <Box mt="2" fontWeight="semibold" as="h4" lineHeight="tight">
            {clash.title}
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

          <Box display="flex" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < extraInfo.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {extraInfo.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
