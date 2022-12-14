import { Games } from '@couragames/shared-types';
import styled from '@emotion/styled';
import Lobby from 'apps/next-couragames/components/lobby';
import SocketContext from 'apps/next-couragames/context/socket';
import React, { useContext, useEffect, useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );
  const [curPlayer, setCurPlayer] = useState(true); //True -> P1; False -> P2

  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    socket?.on('tictac_round_started', (info) => {
      console.log('Started Game');
    });

    socket?.on('tictac_round_ended', (data) => {
      console.log('Game Ended');
    });

    return () => {
      // socket?.off('rps_round_ended');
    };
  }, [socket]);

  const displayValue = (position: number) => {
    // if (position === 0) return '';
    // else if (position === 1) return 'X';
    // else return 'O';

    return !position ? ' ' : position === 1 ? 'X' : 'O';
  };

  const validateMove = (x: number, y: number) => {
    if (board[x][y] !== 0) {
      console.log('Invalid Move');
      return;
    }

    const newVal = curPlayer ? 1 : 2;

    const copy = [...board];
    copy[x][y] = newVal;

    setBoard(copy);
    setCurPlayer
    (!curPlayer);
  };


  const checkWin = () => {
    
  }

  return (
    <Lobby game={Games.TicTacToe} redirect="tic-tac-toe">
      <Container>
        <div>Tic Tac Toe</div>
        <GameTable>
          <tbody>
            {board.map((rows, x) => (
              <tr>
                {rows.map((col, y) => (
                  <td onClick={() => validateMove(x, y)}>
                    {displayValue(col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </GameTable>
      </Container>
    </Lobby>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const GameTable = styled.table`
  /* border: 1px solid white; */
  tr {
    /* border: 1px solid white; */
  }

  td {
    border: 1px solid white;
    padding: 5px;
    width: 55px;
    height: 25px;

    text-align: center;

    cursor: pointer;
  }
`;
