import { Games } from '@couragames/shared-types';
import Lobby from 'apps/next-couragames/components/lobby';
import SocketContext from 'apps/next-couragames/context/socket';
import React, { useContext, useEffect } from 'react';

export default function index() {
  const socket = useContext(SocketContext).socket;

  useEffect(() => {
    socket?.on('rps_round_started', (info) => {
      console.log('Started Game');
    });

    socket?.on('rps_round_ended', (data) => {});

    return () => {
      socket?.off('rps_round_ended');
    };
  }, [socket]);

  return (
    <Lobby game={Games.RPS} redirect="rock-paper-scissors">
      <div>Tic Tac Toe</div>
    </Lobby>
  );
}
