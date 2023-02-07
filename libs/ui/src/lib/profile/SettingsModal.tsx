import React from 'react';
import {
  Avatar,
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
} from '@chakra-ui/react';

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
            <FormLabel>Status</FormLabel>
            <Input placeholder="Winning all the games..." />
          </FormControl>
          <Avatar src={avatarURL}></Avatar>
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
