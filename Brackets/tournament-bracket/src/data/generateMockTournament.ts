
import type { Tournament, Player, Match, Round } from "../types/tournament";

const countries = [
  'CHN', 'JPN', 'GER', 'SWE', 'KOR', 'BRA', 'FRA', 'USA',
  'ENG', 'TPE', 'HKG', 'SGP', 'ROU', 'RUS', 'EGY', 'NGR'
];

function getPlayer(seed: number): Player {
  const country = countries[(seed - 1) % countries.length];
  return {
    id: `player-${seed}`,
    name: `Player ${seed}`,
    country,
    seed,
  };
}

export function generateMockTournament(): Tournament {
  const rounds: Round[] = [];
  let matchId = 1;
  let numPlayers = 128;
  let matchesInRound = numPlayers / 2;
  let previousRoundWinners: Player[] = [];

  // First round: 128 players, 64 matches
  const firstRoundMatches: Match[] = [];
  for (let i = 0; i < matchesInRound; i++) {
    const p1 = getPlayer(i * 2 + 1);
    const p2 = getPlayer(i * 2 + 2);
    firstRoundMatches.push({
      id: `match-${matchId++}`,
      round: 1,
      matchNumber: i + 1,
      player1: p1,
      player2: p2,
      status: 'completed',
      winner: 'player1',
      score: { player1: 4, player2: 2 },
    });
    previousRoundWinners.push(p1); // For mock, always player1 wins
  }
  rounds.push({ id: 'round-1', name: 'Round of 128', matches: firstRoundMatches });

  // Subsequent rounds
  const roundNames = [
    'Round of 64', 'Round of 32', 'Round of 16',
    'Quarterfinals', 'Semifinals', 'Final'
  ];
  for (let r = 0; r < roundNames.length; r++) {
    matchesInRound = previousRoundWinners.length / 2;
    const matches: Match[] = [];
    const nextWinners: Player[] = [];
    for (let i = 0; i < matchesInRound; i++) {
      const p1 = previousRoundWinners[i * 2];
      const p2 = previousRoundWinners[i * 2 + 1];
      matches.push({
        id: `match-${matchId++}`,
        round: r + 2,
        matchNumber: i + 1,
        player1: p1,
        player2: p2,
        status: r < roundNames.length - 1 ? 'completed' : 'upcoming',
        winner: r < roundNames.length - 1 ? 'player1' : undefined,
        score: r < roundNames.length - 1 ? { player1: 4, player2: 2 } : undefined,
      });
      if (r < roundNames.length - 1) nextWinners.push(p1);
    }
    rounds.push({ id: `round-${r + 2}`, name: roundNames[r], matches });
    previousRoundWinners = nextWinners;
  }

  return {
    id: 'tournament-1',
    name: 'World Table Tennis Championship 2024',
    status: 'ongoing',
    startDate: '2024-03-01',
    endDate: '2024-03-07',
    rounds,
  };
}