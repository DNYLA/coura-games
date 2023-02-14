import styled from '@emotion/styled';
import React, { useState } from 'react';

export interface CheckboxProps {
  toggled: boolean;
  onToggle: (value: boolean) => void;
  title: string;
}

export function Checkbox({ toggled, onToggle, title }: CheckboxProps) {
  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Do Any local logic

    onToggle(e.target.checked);
  };

  return (
    <Switch>
      <Label>
        <input type="checkbox" checked={toggled} onChange={onClick} />
        <Slider rounded={false} checked={toggled} onChange={onToggle} />
      </Label>
      <p>{title}</p>
    </Switch>
  );
}

const Switch = styled.label`
  margin: 2px 0;
  width: 100%;
  display: flex;
  gap: 3px;
`;

const Label = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 23px;
  margin-left: 10px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + span:before {
    transform: translatex(26px);
  }
  input:checked + span {
    //Enable this if you want background colour to change when checked
  }
`;

const Slider = styled.span<any>`
position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 1.5px;
  bottom: 0;
  transition: 0.4s;
  background-color: black;
  ${(props) =>
    props.isSquare
      ? `
          border-radius: 0px;
        `
      : `
          border-radius: 17px;
        `}
  :before {
    position: absolute;
    content: '';
    height: 19px;
    width: 19px;
    left: 1.5px;
    bottom: 2px;
    background-color: ${({ theme, checked }) =>
      !checked
        ? '#EEE'
        : '#CF5C36'}; //If Checked then back-col = SwitchActive if its defined Else default to Title Color (Best to stick with title but you can override)
    transition: 0.4s;
    ${(props) =>
      props.isSquare
        ? `
            border-radius: 0px;
          `
        : `
            border-radius: 17px;
          `}`;
