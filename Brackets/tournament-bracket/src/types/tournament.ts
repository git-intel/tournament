export interface Player {
  id: string;
  name: string;
  country: string;
  avatar?: string;
  seed?: number;
}

export interface Match {
  id: string;
  round: number;
  matchNumber: number;
  player1: Player;
  player2: Player;
  score?: {
    player1: number;
    player2: number;
  };
  status: 'scheduled' | 'live' | 'completed';
  winner?: 'player1' | 'player2';
  startTime?: string;
  court?: string;
}

export interface Round {
  id: string;
  name: string;
  matches: Match[];
}

export interface Tournament {
  id: string;
  name: string;
  rounds: Round[];
  status: 'upcoming' | 'ongoing' | 'completed';
  startDate: string;
  endDate: string;
} 