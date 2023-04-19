import {
  Box,
  Center,
  chakra,
  Collapse,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { FcRating, FcSelfServiceKiosk } from 'react-icons/fc';
import { FiServer } from 'react-icons/fi';
import { MdMusicNote } from 'react-icons/md';

export interface SkelentonPageProps {
  isLoading: boolean;
  amount?: number;
}

export function StatsSkeleton({ isLoading }: SkelentonPageProps) {
  const bgCol = useColorModeValue('#F9FAFB', 'gray.600');
  const bgCol2 = useColorModeValue('white', 'gray.800');
  const bgCol3 = useColorModeValue('gray.800', 'gray.200');
  const bgUrl = 'https://wallpapercave.com/wp/wp1818813.jpg';

  return (
    <Collapse in={isLoading}>
      <Box m={5}>
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <SkelentoStatsCard
              title={'Rating'}
              icon={<FcRating size={'3em'} />}
              isLoading={isLoading}
              value={'1600'}
            />
            {isLoading &&
              new Array(5)
                .fill(0)
                .map(() => (
                  <SkelentoStatsCard
                    icon={<FcSelfServiceKiosk size={'3em'} />}
                    isLoading={isLoading}
                    value={'1600'}
                  />
                ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Collapse>
  );
}

const SkelentoStatsCard = ({ icon, title, isLoading }: any) => {
  const bgCol = useColorModeValue('#F9FAFB', 'gray.600');
  const bgCol2 = useColorModeValue('white', 'gray.800');
  const bgCol3 = useColorModeValue('gray.800', 'gray.200');
  return (
    <Flex bg={bgCol} p={0.5} rounded="lg" mb={5}>
      <Flex
        mx="auto"
        // bg={bgCol2}
        shadow="lg"
        rounded="lg"
        width={'100%'}
        minH={115}
        justifyContent="space-between"
      >
        <Box w={2 / 3} p={{ base: 4, md: 4 }} ml={2}>
          {/* <Skeleton mt={2} height={8} /> */}
          {/* <Header fontWeight={'medium'} isTruncated> */}
          <Skeleton
            mt={2}
            height={7}
            width={2 / 3}
            isLoaded={title ? true : false}
          >
            <chakra.h1
              fontSize="medium"
              color={useColorModeValue('gray.800', 'white')}
            >
              {title}
            </chakra.h1>
          </Skeleton>

          <Skeleton mt={2} height={7} width={1 / 3} isLoaded={!isLoading} />
        </Box>
        <Box my="auto" alignContent="center" pr={{ base: 2, md: 4 }}>
          {icon}
        </Box>
      </Flex>
    </Flex>
  );
};
