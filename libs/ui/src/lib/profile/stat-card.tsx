import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
  sx?: any;
}
export default function StatsCard({ title, stat, icon, sx }: StatsCardProps) {
  const bgCol = useColorModeValue('#F9FAFB', 'gray.600');
  const bgCol2 = useColorModeValue('white', 'gray.800');
  const bgCol3 = useColorModeValue('gray.800', 'gray.200');

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'2px solid'}
      rounded={'lg'}
      sx={sx}
      borderColor={useColorModeValue('#F9FAFB', 'gray.600')}
      // background={bgCol2}
      bgColor={useColorModeValue('#F9FAFB', 'gray.600')}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'}>{title}</StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
