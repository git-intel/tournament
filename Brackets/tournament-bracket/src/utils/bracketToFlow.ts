import type { TournamentEvent } from "../data/generateTournamentData";

export function eventToFlow(event: TournamentEvent) {
  const nodes = [];
  const edges = [];
  const xGap = 300;
  const yGap = 60;
  let yOffsets: number[] = [];

  event.rounds.forEach((round, roundIdx) => {
    yOffsets[roundIdx] = 0;
    round.forEach((match, matchIdx) => {
      const nodeId = match.id;
      nodes.push({
        id: nodeId,
        position: {
          x: roundIdx * xGap,
          y: matchIdx * (120 + yGap),
        },
        data: {
          label: `${match.player1?.name ?? 'TBD'} ${match.player1 ? `(${match.player1.country})` : ''} vs ${match.player2?.name ?? 'TBD'} ${match.player2 ? `(${match.player2.country})` : ''}`,
          match,
        },
        type: 'default',
      });

      // Edges from previous round
      if (roundIdx > 0) {
        const parentIdx = matchIdx * 2;
        const prevRound = event.rounds[roundIdx - 1];
        if (prevRound[parentIdx]) {
          edges.push({
            id: `e-${prevRound[parentIdx].id}-${nodeId}`,
            source: prevRound[parentIdx].id,
            target: nodeId,
            animated: false,
            type: 'smoothstep',
          });
        }
        if (prevRound[parentIdx + 1]) {
          edges.push({
            id: `e-${prevRound[parentIdx + 1].id}-${nodeId}`,
            source: prevRound[parentIdx + 1].id,
            target: nodeId,
            animated: false,
            type: 'smoothstep',
          });
        }
      }
    });
  });

  return { nodes, edges };
}