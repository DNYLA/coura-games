import { Games } from '@couragames/shared-types';
import Lobby from 'apps/next-couragames/components/lobby';
import SocketContext from 'apps/next-couragames/context/socket';
import React, { useContext, useEffect } from 'react';

export default function TicTacToe() {
  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    socket?.on('tictac_round_started', (info) => {
      console.log('Started Game');
    });

    socket?.on('tictac_round_ended', (data) => {
      console.log('Game Ended');
    });

    return () => {
      socket?.off('rps_round_ended');
    };
  }, [socket]);

  return (
    <Lobby game={Games.TicTacToe} redirect="tic-tac-toe">
      <div>Tic Tac Toe</div>
    </Lobby>
  );
}
