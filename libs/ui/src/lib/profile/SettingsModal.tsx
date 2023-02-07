import React from 'react';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import FileUpload from '../forms/FileUpload';

interface SettingsModelProps {
  open: boolean;
  onClose: any;
  avatarURL: string;
}

export default function SettingsModal({
  open,
  onClose,
  avatarURL,
}: SettingsModelProps) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Settings</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Avatar</FormLabel>
            <Box boxSize="150px">
              <Image borderRadius="full" src={avatarURL} alt="Dan Abramov" />
            </Box>
            <FileUpload
              name={''}
              placeholder={''}
              fileTypes={'.jpg,.png,.gif,.webp'}
              control={undefined}
              children={undefined}
              isRequired={false}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Input placeholder="Winning all the games..." />
          </FormControl>
        </ModalBody>
        <ModalBody>
          <FormControl>
            <FormLabel>Comments</FormLabel>
            <Select defaultValue={'option1'}>
              <option value="option1">Everyone</option>
              <option value="option2">Friends Only</option>
              <option value="option3">No One</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={'blue'} mr={3}>
            Save
          </Button>
          <Button>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
