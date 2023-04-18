import { Box, IconButton } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement, useState } from 'react';
import { IconType } from 'react-icons';

export type IconActionButtonProps = {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  callback?: () => void;
};

export default function IconActionButton({
  icon,
  callback,
}: IconActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    if (isLoading) return;
    if (callback) callback();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <Box position={'absolute'} right={'10px'}>
      <IconButton
        isLoading={isLoading}
        onClick={onClick}
        size={'sm'}
        aria-label="Search.."
        icon={icon}
      />
    </Box>
  );
}
