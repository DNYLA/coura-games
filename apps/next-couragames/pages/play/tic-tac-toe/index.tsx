import Lobby from 'apps/next-couragames/pages/play/lobby';
import RPSGame from 'apps/next-couragames/pages/play/rock-paper-scissors/game';
import React from 'react';

export default function index() {
  return (
    <Lobby redirect="rock-paper-scissors">
      <div>Test</div>
    </Lobby>
  );
}
