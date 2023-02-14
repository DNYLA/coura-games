import React, { useEffect, useState } from 'react';

export type Countdown = {
  // days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const useCountdown = (target: Date) => {
  const difference = target.getTime() - new Date().getTime();
  const [countdown, setCountdown] = useState<Countdown>();
  const [expired, setExpired] = useState(false);
  console.log(target);

  const calculateTime = () => {
    if (difference > 0) {
      const time: Countdown = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      setCountdown(time);
    } else {
      setExpired(true);
    }
  };

  useEffect(() => {
    // calculateTime();
    const timer = setTimeout(() => {
      calculateTime();
    }, 1000);

    return () => clearTimeout(timer);
  });

  return { countdown, expired };
};

export default useCountdown;
