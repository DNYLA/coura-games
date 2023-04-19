import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  LinkIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

export type CreateTrack = {
  title: string;
  artist: string;
  length: string;
  youtubeUrl: string;
};

const options = [
  { id: 1, desc: '1 lorem ipsum' },
  { id: 2, desc: 'Lorem, ipsum dolor.' },
  { id: 3, desc: 'Monthly Updates' },
];
interface PackageTierProps {
  position: number;
  track: CreateTrack;
  handleChange: (i: number, a: number) => void;
  deleteCallback: (i: number) => void;
  handleSwitch: (i: number) => void;
}
export const SongCard = ({
  track,
  position,
  handleChange,
  deleteCallback,
  handleSwitch,
}: PackageTierProps) => {
  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}
    >
      <Heading textAlign={'center'} size={'lg'} w={200}>
        {track.title}
      </Heading>
      {/* <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List> */}
      <WrapItem>
        <Avatar
          // src={getYoutubeThumbnail(track.youtubeUrl)}
          name={track.title}
          size={'lg'}
          objectFit={'cover'}
        />
      </WrapItem>
      <Heading size={'md'} width={200} textAlign={'center'}>
        {track.artist}
      </Heading>
      <Stack direction={['column', 'row']} justify={'end'}>
        <IconButton
          variant="outline"
          aria-label="Search database"
          colorScheme="blue"
          icon={<ArrowUpIcon />}
          onClick={() => handleChange(position, -1)}
        />
        <IconButton
          variant="outline"
          aria-label="Search database"
          colorScheme="blue"
          icon={<ArrowDownIcon />}
          onClick={() => handleChange(position, 1)}
        />
        {/* <OptionButton
          deleteCallback={() => deleteCallback(position)}
          handleSwitch={() => handleSwitch(position)}
        /> */}
      </Stack>
    </Stack>
  );
};

interface SongCardContainerProps {
  tracks: CreateTrack[];
  setId: string;
  setTracks: (tracks: CreateTrack[]) => void;
  handleSwitch: (i: number) => void;
}
const SongCardConainer = ({
  tracks,
  setTracks,
  handleSwitch,
  setId,
}: SongCardContainerProps) => {
  const updatePosition = (index: number, amount: number) => {
    const newIndex = index + amount;
    const _tracks = [...tracks];

    //check if newIndex is out of bounds
    if (newIndex > _tracks.length - 1 || newIndex < 0) {
      console.log('Invalid Amount');
      return;
    }

    _tracks.splice(index, 1);
    _tracks.splice(newIndex, 0, tracks[index]);
    setTracks(_tracks);
  };

  const handleDelete = (index: number) => {
    //Ask for Confirmation before deleting.
    setTracks(tracks.filter((t, i) => i !== index));
  };

  return (
    <Box
      py={6}
      px={5}
      display={'flex'}
      justifyContent={{ base: 'flex-start' }}
      alignItems={'stretch'}
    >
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          // alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}
        >
          <Stack
            width={{
              base: '100%',
              md: '40%',
            }}
            textAlign={'center'}
          >
            <Heading size={'lg'} textAlign={'center'}>
              Songs From <Text color="purple.400">{setId} Set</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: '100%',
              md: '60%',
            }}
          >
            <Text textAlign={'center'}>
              This is the first set of songs. The order the songs are in below
              is the order they are played in the game. You can hold one of the
              cards to re-arange. The second list is displayed below.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        {tracks.map((track, i) => {
          return (
            <Box key={i}>
              <SongCard
                track={track}
                position={i}
                handleChange={updatePosition}
                deleteCallback={handleDelete}
                handleSwitch={handleSwitch}
              />
              <Divider />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SongCardConainer;
