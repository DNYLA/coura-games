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
            <Input placeholder="Stauts" />
          </FormControl>
          <Avatar src={avatarURL}></Avatar>
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
