import { position, propNames } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

export default function TicTacToeDesign() {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const displayValue = (position: number) => {
    // if (position === 0) return '';
    // else if (position === 1) return 'X';
    // else return 'O';

    return !position ? ' ' : position === 1 ? 'X' : 'O';
  };

  return (
    <Container>
      <Game>
        {board.map((rows, x) => {
          return rows.map((col, y) => (
            <GridItem key={y} value={col}>
              {displayValue(col)}
            </GridItem>
          ));
        })}
      </Game>
    </Container>
  );
}

const cols = {
  naughts: '#feaf00',
  crosses: '#00c7bf',
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* background-color: red; */
  min-width: 250px;
`;

const GridItem = styled.div<{ value: number }>`
  cursor: ${(props) => (props.value === 0 ? 'pointer' : 'not-allowed')};
  margin: 10px 15px;
  height: 50px;
  display: flex;
  font-size: 25px;
  text-align: center;
  background-color: #173641;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.value === 1 ? cols.crosses : cols.naughts)};
`;
