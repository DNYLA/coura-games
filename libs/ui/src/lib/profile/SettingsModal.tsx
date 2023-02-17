import React, { useContext, useEffect, useState } from 'react';
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
// import FileUpload from '../forms/FileUpload';
import { updateUser as updateUserEndpoint } from 'libs/ui/src/api';
import { UpdateUser } from '@couragames/shared-types';
import { UserContext } from '../context/auth';
import { FileUpload } from '../forms/FileUpload';

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
  const { user, updateUser } = useContext(UserContext);

  const [newAvatar, setNewAvatar] = useState<File>();
  const [imageURL, setImageURL] = useState(avatarURL);
  const [settings, setSettings] = useState<UpdateUser>({
    status: user!.status,
  });

  const onAvatarChange = async (file: File) => {
    setNewAvatar(file);
    setImageURL(URL.createObjectURL(file));
    // setAlert('Test');
  };

  const handleSave = async () => {
    try {
      updateUser(username, settings, newAvatar);
      setNewAvatar(undefined);
      // setImageURL(data.avatarUrl);
      // console.log(data);
      onClose();
    } catch (err) {
      //Show Modal
      console.log('Error');
    }
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
