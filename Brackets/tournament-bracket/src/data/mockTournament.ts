import type { Tournament } from "../types/tournament";

export const mockTournament: Tournament = {
  id: 'tournament-1',
  name: 'World Table Tennis Championship 2024',
  status: 'ongoing',
  startDate: '2024-03-01',
  endDate: '2024-03-07',
  rounds: [
    {
      id: 'round-1',
      name: 'Round of 16',
      matches: [
        {
          id: 'match-1',
          round: 1,
          matchNumber: 1,
          player1: {
            id: 'player-1',
            name: 'Ma Long',
            country: 'CHN',
            seed: 1,
          },
          player2: {
            id: 'player-2',
            name: 'Tomokazu Harimoto',
            country: 'JPN',
            seed: 16,
          },
          status: 'completed',
          winner: 'player1',
          score: {
            player1: 4,
            player2: 2,
          },
        },
        {
          id: 'match-2',
          round: 1,
          matchNumber: 2,
          player1: {
            id: 'player-3',
            name: 'Fan Zhendong',
            country: 'CHN',
            seed: 2,
          },
          player2: {
            id: 'player-4',
            name: 'Hugo Calderano',
            country: 'BRA',
            seed: 15,
          },
          status: 'live',
          score: {
            player1: 2,
            player2: 1,
          },
        },
        // Add more matches as needed
      ],
    },
    {
      id: 'round-2',
      name: 'Quarterfinals',
      matches: [
        {
          id: 'match-3',
          round: 2,
          matchNumber: 1,
          player1: {
            id: 'player-1',
            name: 'Ma Long',
            country: 'CHN',
            seed: 1,
          },
          player2: {
            id: 'player-5',
            name: 'TBD',
            country: 'TBD',
          },
          status: 'scheduled',
          startTime: '2024-03-05T10:00:00Z',
        },
      ],
    },
  ],
}; 