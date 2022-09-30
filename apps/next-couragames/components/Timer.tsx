import useCountdown from 'apps/next-couragames/hooks/useCountdown';
import React from 'react';

export interface TimerProps {
  end: Date;
}

export default function Timer({ end }: TimerProps) {
  const { countdown } = useCountdown(end);
  return (
    <div>
      This is my TImer
      {countdown && (
        <div>
          {countdown.minutes} : {countdown.seconds}
        </div>
      )}
    </div>
  );
}
