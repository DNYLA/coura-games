import styled from '@emotion/styled';
import React from 'react';

interface RangeProps {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export default function Range({
  title,
  min,
  max,
  step,
  value,
  onChange,
}: RangeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <>
      <Container>
        <p>{title}:</p>

        <StyledRange
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
        <h1>{value}</h1>
      </Container>
    </>
  );
}

const height = '36px';
const thumbHeight = 36;
const trackHeight = '16px';

const makeLongShadow = (color: any, size: any) => {
  let i = 18;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 706; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }
  return shadow;
};

const Container = styled.div`
  p {
  }
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    padding-left: 10px;
  }
`;

const StyledRange = styled.input`
  /* width: 100%; */
  overflow: hidden;
  display: block;
  appearance: none;
  /* max-width: 700px; */
  /* width: 820px; */
  width: 100%;
  margin: 0;
  height: ${height};
  background: transparent;
  border-radius: 15px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    background: ${`linear-gradient(to bottom, #ff9929, #ff9929) 100% 50% / 100% 16px no-repeat transparent`};
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: #8d8d8e;
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${(p) => makeLongShadow('#141617', '-10px')};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${height};
    background: ${`linear-gradient(to bottom, #141617, #141617) 100% 50% / 100% 16px no-repeat transparent`};
  }

  &::-moz-range-progress {
    background: ${`linear-gradient(to bottom, #ff9929, #ff9929) 100% 50% / 100% 16px no-repeat transparent`};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: #8d8d8e;
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
  }

  &::-ms-track {
    width: 100%;
    height: ${height};
    border: 0;
    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${`linear-gradient(to bottom, #ff9929, #ff9929) 100% 50% / 100% 16px no-repeat transparent`};
  }
  &::-ms-fill-upper {
    background: ${`linear-gradient(to bottom, #141617, #141617) 100% 50% / 100% 16px no-repeat transparent`};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: #8d8d8e;
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    /* IE Edge thinks it can support -webkit prefixes */
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      background-color: #8d8d8e;
    }
    &::-moz-range-thumb {
      background-color: #8d8d8e;
    }
    &::-ms-thumb {
      background-color: #8d8d8e;
    }
  }
`;
