import { Games, Player } from '@couragames/shared-types';

export type Lobby = {
  id: string;
  hostId: string;
  type: Games;
  players: Player[];
  maxPlayers: number;
  started: boolean;
  lastActivity: Date;
};
