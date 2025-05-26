import type { Match, Tournament } from "../types/tournament";

interface MatchLayout {
  x: number;
  y: number;
  round: number;
  match: Match;
}

export function calculateBracketLayout(
  tournament: Tournament,
  matchWidth: number,
  matchHeight: number,
  roundGap: number,
  matchGap: number
): Record<string, MatchLayout> {
  const layout: Record<string, MatchLayout> = {};

  // First round: evenly spaced
  const firstRound = tournament.rounds[0];
  firstRound.matches.forEach((match, i) => {
    layout[match.id] = {
      x: 0,
      y: i * (matchHeight + matchGap),
      round: 0,
      match,
    };
  });

  // For each subsequent round
  for (let r = 1; r < tournament.rounds.length; r++) {
    const prevRound = tournament.rounds[r - 1];
    const currRound = tournament.rounds[r];

    currRound.matches.forEach((match, i) => {
      // Find the two parent matches in the previous round
      // For a standard single-elimination bracket, parent matches are at indices 2*i and 2*i+1
      const parent1 = prevRound.matches[2 * i];
      const parent2 = prevRound.matches[2 * i + 1];
      const parent1Y = layout[parent1.id].y;
      const parent2Y = layout[parent2.id].y;

      // Center this match between its parents
      const y = (parent1Y + parent2Y) / 2;
      const x = r * (matchWidth + roundGap);

      layout[match.id] = {
        x,
        y,
        round: r,
        match,
      };
    });
  }

  return layout;
}