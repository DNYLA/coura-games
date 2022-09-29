import useCountdown from 'apps/next-couragames/hooks/useCountdown';
import React from 'react';

export default function Timer() {
  const { countdown } = useCountdown(new Date(1664460379 * 1000));
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
