import { Games, TicTacToeInfo } from '@couragames/shared-types';
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
  // const [curPlayer, setCurPlayer] = useState(true); //True -> P1; False -> P2
  const [gameInfo, setGameInfo] = useState<Omit<TicTacToeInfo, 'board'>>({
    p1Score: 0,
    p2Score: 0,
    draws: 0,
    isCrosses: false,
    timer: 0,
  }); //True -> P1; False -> P2
  const [infoMessage, setInfoMessage] = useState('');
  const [restartInfo, setRestartInfo] = useState({
    message: 'Play Again',
    num: 0,
    ended: false,
  });
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const { lobby } = router.query;
  useEffect(() => {
    socket?.on('tictac_nextround', (info: TicTacToeInfo) => {
      const { p1Score, p2Score, draws, isCrosses, timer } = info;
      setBoard(info.board);
      setGameInfo({ p1Score, p2Score, draws, isCrosses, timer });
      setInfoMessage('');
    });

    socket?.on('tictac_gameended', (data) => {
      setBoard(data.board);
      setRestartInfo({ ...restartInfo, ended: true });
      setGameInfo({
        ...gameInfo,
        p1Score: data.p1Score,
        p2Score: data.p2Score,
        draws: data.draws,
      });

      if (data.winner === 'draw') {
        setInfoMessage('You drew the game!');
        return;
      }

      const didWin = data.winner === socket.id ? true : false;
      const message = didWin ? 'You won the game!' : 'You lost the game!';

      setInfoMessage(message);
    });

    socket?.on('game_message', (message) => {
      setInfoMessage(message);
    });

    socket?.on('tictactoe_replay', (amount: number) => {
      const message =
        amount !== 2 ? `Play Again (${amount ?? 0}/2)` : 'Restarting...';
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

    return !position ? '' : position === 1 ? 'X' : 'O';
  };

  const submitMove = (x: number, y: number) => {
    socket.emit('tictactoe_move', { id: lobby, x, y });
  };

  // const submitMove2 = (x: number, y: number) => {
  //   socket.emit('lobby', {
  //     game: game,
  //     type: LobbyEvents.PlayerMove,
  //     id: lobbyInfo.id,
  //     payload: data,
  //   });
  // };

  const handlePlayAgain = () => {
    socket.emit('tictactoe_playagain', { id: lobby });
  };

  const handleHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number,
    isEnter: boolean
  ) => {
    if (!isEnter) {
      e.currentTarget.textContent = displayValue(board[x][y]);
      e.currentTarget.style.color = '';
      return;
    }

    if (board[x][y] !== 0) return;
    e.currentTarget.textContent = gameInfo.isCrosses ? 'X' : 'O';
    e.currentTarget.style.color = gameInfo.isCrosses
      ? cols.crosses
      : cols.naughts;
  };

  // const checkWin = () => {};
  return (
    <Lobby game={Games.TicTacToe} redirect="tic-tac-toe">
      <Container>
        {infoMessage && <div>{infoMessage}</div>}
        <div>X Turn</div>
        <Game>
          {board.map((rows, x) => {
            return rows.map((col, y) => (
              <GridItem
                value={col}
                key={y}
                onClick={() => submitMove(x, y)}
                onMouseOver={(e) => handleHover(e, x, y, true)}
                onMouseLeave={(e) => handleHover(e, x, y, false)}
              >
                {displayValue(col)}
              </GridItem>
            ));
          })}
        </Game>
        <div className="stat_container">
          <GameInfo type={0}>
            <p>{gameInfo.isCrosses ? 'You' : 'OPP'}</p>
            <span>{gameInfo.p1Score}</span>
          </GameInfo>

          <GameInfo type={1}>
            <p>TIES</p>
            <span>{gameInfo.draws}</span>
          </GameInfo>

          <GameInfo type={2}>
            <p>{!gameInfo.isCrosses ? 'You' : 'OPP'}</p>
            <span>{gameInfo.p2Score}</span>
          </GameInfo>
        </div>
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

const cols = {
  naughts: '#feaf00',
  crosses: '#00c7bf',
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .stat_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* background-color: red; */
    min-width: 250px;
  }
`;

const Game = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* background-color: red; */
  min-width: 250px;
`;

const GameInfo = styled.div<{ type: number }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: ${(props) =>
    props.type === 0
      ? cols.crosses
      : props.type === 1
      ? '#a3bfca'
      : cols.naughts};

  margin: 10px 15px;
  height: 50px;
  display: flex;
  font-size: 14px;
  text-align: center;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;

  span {
    font-size: 16px;
    font-weight: 600;
  }
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
