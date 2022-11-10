import React from 'react';

interface RangeProps {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Range({
  title,
  min,
  max,
  step,
  value,
  onChange,
}: RangeProps) {
  return (
    <>
      <input type="range" />
    </>
  );
}
