import { Games } from '@couragames/shared-types';

export type Lobby = {
  id: string;
  hostId: string;
  type: Games;
  players: [];
  maxPlayers: number;
  started: boolean;
  lastActivity: Date;
};
