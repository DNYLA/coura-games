import { Box } from '@chakra-ui/layout';
import useCountdown from '../hooks/useCountdown';

export interface TimerProps {
  end: Date;
}

export default function Timer({ end }: TimerProps) {
  const { countdown } = useCountdown(end);
  return (
    <Box my="3">
      {countdown && (
        <div>
          {countdown.minutes} : {countdown.seconds}
        </div>
      )}
    </Box>
  );
}
