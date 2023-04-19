import {
  Box,
  Center,
  chakra,
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
import { FiServer } from 'react-icons/fi';
import { MdMusicNote } from 'react-icons/md';

export interface SkelentonPageProps {
  isLoading: boolean;
  amount?: number;
}

export default function StatsSkeleton({ isLoading }: SkelentonPageProps) {
  const bgCol = useColorModeValue('#F9FAFB', 'gray.600');
  const bgCol2 = useColorModeValue('white', 'gray.800');
  const bgCol3 = useColorModeValue('gray.800', 'gray.200');
  const bgUrl = 'https://wallpapercave.com/wp/wp1818813.jpg';

  return isLoading ? (
    <Box m={5}>
      <Box
        p={5}
        width={'100%'}
        borderWidth="1px"
        height={150}
        bgColor={bgCol2}
        rounded="lg"
      >
        <Center>
          <Skeleton h={10} w={'70%'} mb={3} />
        </Center>
        <HStack justifyContent="center">
          <Skeleton w={250} h={5} />
          <Text>vs</Text>
          <Skeleton w={250} h={5} />
        </HStack>
      </Box>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <SkelentoStatsCard
            title={'Current Players'}
            icon={<BsPerson size={'3em'} />}
          />
          <SkelentoStatsCard
            title={'Lobbies'}
            icon={<FiServer size={'3em'} />}
          />
          <SkelentoStatsCard
            title={'Songs'}
            icon={<MdMusicNote size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
      <Grid mt={26} templateColumns="repeat(11, 1fr)" gap={4}>
        <GridItem colSpan={5}>
          {Array(4)
            .fill('')
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </GridItem>

        <GridItem colSpan={1}>
          <Center height={'100%'}>
            <Divider orientation="vertical" />
          </Center>
        </GridItem>

        <GridItem colSpan={5}>
          {Array(4)
            .fill('')
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </GridItem>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}

const SkeletonCard = () => {
  const bgCol = useColorModeValue('#F9FAFB', 'gray.600');
  const bgCol2 = useColorModeValue('white', 'gray.800');

  return (
    <Flex bg={bgCol} p={0.5} rounded="lg" mb={5}>
      <Flex
        mx="auto"
        bg={bgCol2}
        shadow="lg"
        rounded="lg"
        width={'100%'}
        minH={115}
      >
        <Box w={1 / 3} bgSize="cover" as={Skeleton} />
        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
          <Skeleton mt={2} height={8} />
          <Skeleton mt={2} height={5} width={2 / 3} />
        </Box>
      </Flex>
    </Flex>
  );
};

const SkelentoStatsCard = ({ icon, title }: any) => {
  const bgCol = useColorModeValue('#F9FAFB', 'gray.600');
  const bgCol2 = useColorModeValue('white', 'gray.800');
  const bgCol3 = useColorModeValue('gray.800', 'gray.200');
  return (
    <Flex bg={bgCol} p={0.5} rounded="lg" mb={5}>
      <Flex
        mx="auto"
        bg={bgCol2}
        shadow="lg"
        rounded="lg"
        width={'100%'}
        minH={115}
        justifyContent="space-between"
      >
        <Box w={2 / 3} p={{ base: 4, md: 4 }} ml={2}>
          {/* <Skeleton mt={2} height={8} /> */}
          {/* <Header fontWeight={'medium'} isTruncated> */}
          <chakra.h1
            fontSize="medium"
            color={useColorModeValue('gray.800', 'white')}
          >
            {title}
          </chakra.h1>
          <Skeleton mt={2} height={7} width={2 / 3} />
        </Box>
        <Box my="auto" alignContent="center" pr={{ base: 2, md: 4 }}>
          {icon}
        </Box>
      </Flex>
    </Flex>
  );
};
