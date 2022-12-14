import styled from '@emotion/styled';

export const MenuButton = styled.button<{ margin?: string }>`
  background-color: #4a5568;
  padding: 7px;
  border: 2px solid #2c2c2c;
  border-radius: 10px;
  font-size: 20px;
  :hover {
    background-color: #718096;
    border-radius: 8px;
    transition: all 300ms;
  }
  /* margin-top: 10px; */
  margin-bottom: 10px;
  transition: all 450ms ease;
`;
