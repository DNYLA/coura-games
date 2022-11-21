import { Games } from '@couragames/shared-types';
import Lobby from 'apps/next-couragames/components/lobby';
import React from 'react';

export default function index() {
  return (
    <Lobby game={Games.RPS} redirect="rock-paper-scissors">
      <div>Tic Tac Toe</div>
    </Lobby>
  );
}
