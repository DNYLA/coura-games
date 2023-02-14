import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import { ChangeEvent, useRef, useState } from 'react';

interface FileUploadProps {
  name: string;
  placeholder: string;
  fileTypes: string;
  control: any;
  children: any;
  isRequired: boolean;
  setFile: (file: File) => void;
}

export function FileUpload({
  name,
  placeholder,
  fileTypes,
  control,
  children,
  isRequired = false,
  setFile,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 1) {
      setInvalid(true);
      return;
    }

    setValue(e.target.files[0].name);
    setInvalid(false);
    setFile(e.target.files[0]);
  };

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        />
        <input
          type="file"
          accept={fileTypes}
          name={name}
          ref={inputRef}
          // inputRef={ref}
          style={{ display: 'none' }}
          onChange={handleFile}
        ></input>
        <Input
          placeholder={placeholder || 'Your file ...'}
          onClick={handleClick}
          value={value}
          onChange={() => console.log()}
        />
      </InputGroup>
      <FormErrorMessage>{invalid}</FormErrorMessage>
    </FormControl>
  );
}
