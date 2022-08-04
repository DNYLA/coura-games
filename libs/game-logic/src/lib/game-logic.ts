import { Games } from '@couragames/shared-types';
import { Lobby } from '../types';

export function createLobby(type: Games, hostId: string): Lobby {
  const code = generateCode();

  return {
    id: code,
    hostId,
    type,
    players: [],
    maxPlayers: 2,
    started: false,
    lastActivity: new Date(),
  };
}

function generateCode() {
  //Find a way to generate a string that start with 0
  const code = String(Math.floor(Math.random() * 90000) + 10000);

  //Check if GameCode Already Exists
  // const exists = await getLobby(code);
  // if (!exists) return code;
  // else return generateCode();

  return code;
}
