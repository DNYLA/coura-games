import React, { useState } from 'react';
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
import { updateUser } from 'libs/ui/src/api';
import { UpdateUser } from '@couragames/shared-types';

interface SettingsModelProps {
  open: boolean;
  onClose: any;
  avatarURL: string;
  username: string;
}

export default function SettingsModal({
  open,
  onClose,
  avatarURL,
  username,
}: SettingsModelProps) {
  const [newAvatar, setNewAvatar] = useState<File>();
  const [imageURL, setImageURL] = useState(avatarURL);
  const [settings, setSettings] = useState<UpdateUser>({
    status: '',
  });
  const onAvatarChange = async (file: File) => {
    setNewAvatar(file);
    setImageURL(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    updateUser(username, settings, newAvatar);

    console.log(imageURL);
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Settings</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Avatar</FormLabel>
            <Box width={150} height={150}>
              <Image
                width={150}
                height={150}
                borderRadius="full"
                objectFit={'cover'}
                src={imageURL}
                alt="Users Avatar"
              />
            </Box>
            <FileUpload
              name={''}
              placeholder={''}
              fileTypes={'.jpg,.png,.gif,.webp'}
              control={undefined}
              children={undefined}
              isRequired={false}
              setFile={onAvatarChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <Input
              placeholder="Winning all the games..."
              value={settings.status}
              onChange={(e) =>
                setSettings({ ...settings, status: e.target.value })
              }
            />
          </FormControl>

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
          <Button colorScheme={'blue'} mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
