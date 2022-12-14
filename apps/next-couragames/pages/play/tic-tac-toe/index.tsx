import { Games } from '@couragames/shared-types';
import styled from '@emotion/styled';
import Lobby from '../../../components/lobby';
import SocketContext from '../../../context/socket';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MenuButton } from '../../../utils/styles';
import { Box } from '@chakra-ui/react';

export default function TicTacToe() {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );
  const [curPlayer, setCurPlayer] = useState(true); //True -> P1; False -> P2
  const [infoMessage, setInfoMessage] = useState('');
  const [restartInfo, setRestartInfo] = useState({
    message: 'Play Again',
    num: 0,
    ended: false,
  });
  const socket = useContext(SocketContext).socket;
  const router = useRouter();
  const { lobby } = router.query;
  useEffect(() => {
    socket?.on('tictac_nextround', (info) => {
      console.log('Started Game');
      console.log(info);
      console.log(info.board);
      setBoard(info.board);
      setInfoMessage('');
    });

    socket?.on('tictac_gameended', (data) => {
      setBoard(data.board);
      setRestartInfo({ ...restartInfo, ended: true });

      if (data.winner === 'draw') {
        setInfoMessage('You drew the game!');
        return;
      }

      const didWin = data.winner === socket.id ? true : false;
      const message = didWin ? 'You won the game!' : 'You lost the game!';

      setInfoMessage(message);

      console.log('Game Ended');
    });

    socket?.on('game_message', (message) => {
      setInfoMessage(message);
    });

    socket?.on('tictactoe_replay', (amount: number) => {
      const message =
        amount !== 2 ? `Play Again (${amount ?? 0}/2)` : 'Restarting...';
      console.log(amount);
      if (amount == 0) {
        setRestartInfo({ ...restartInfo, ended: false });
        return;
      }

      setRestartInfo({
        message,
        num: amount,
        ended: true,
      });
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
    setCurPlayer(!curPlayer);
  };

  const submitMove = (x: number, y: number) => {
    socket.emit('tictactoe_move', { id: lobby, x, y });
  };

  const handlePlayAgain = () => {
    console.log('yes');
    socket.emit('tictactoe_playagain', { id: lobby });
  };

  // const checkWin = () => {};

  return (
    <Lobby game={Games.TicTacToe} redirect="tic-tac-toe">
      <Container>
        <div>Tic Tac Toe</div>
        <p>{infoMessage}</p>
        <GameTable>
          <tbody>
            {board.map((rows, x) => (
              <tr key={x}>
                {rows.map((col, y) => (
                  <td key={y} onClick={() => submitMove(x, y)}>
                    {displayValue(col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </GameTable>
        {restartInfo.ended && (
          <Box marginTop={'10px'}>
            <MenuButton onClick={handlePlayAgain}>
              {restartInfo.message}
            </MenuButton>
          </Box>
        )}
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
