type Player = {
    id: string;
    name: string;
    country: string;
    seed: number;
  };
  
  type Match = {
    id: string;
    round: number;
    matchNumber: number;
    player1: Player | null;
    player2: Player | null;
    score?: { player1: number; player2: number };
    status: 'completed' | 'upcoming' | 'live';
    winner?: 'player1' | 'player2';
  };
  
  type EventType = 'Men\'s Singles' | 'Women\'s Singles' | 'Men\'s Doubles' | 'Women\'s Doubles' | 'Mixed Doubles';
  
  export type TournamentEvent = {
    id: string;
    name: EventType;
    rounds: Match[][];
  };
  
  const countries = ['CHN', 'JPN', 'GER', 'SWE', 'KOR', 'BRA', 'FRA', 'USA', 'ENG', 'TPE', 'HKG', 'SGP', 'ROU', 'RUS', 'EGY', 'NGR'];
  
  function getPlayer(seed: number): Player {
    const country = countries[(seed - 1) % countries.length];
    return {
      id: `player-${seed}`,
      name: `Player ${seed}`,
      country,
      seed,
    };
  }
  
  export function generateEvent(eventName: EventType, numPlayers = 128): TournamentEvent {
    const rounds: Match[][] = [];
    let players: Player[] = [];
    
    if (eventName.includes('Doubles')) {
      for (let i = 1; i <= numPlayers; i++) {
        players.push({
          id: `team-${i}`,
          name: `Team ${i}`,
          country: countries[(i - 1) % countries.length],
          seed: i,
        });
      }
    } else {
      for (let i = 1; i <= numPlayers; i++) {
        players.push(getPlayer(i));
      }
    }
  
    let matches: Match[] = [];
    let matchId = 1;
    
    // First round
    for (let i = 0; i < players.length; i += 2) {
      matches.push({
        id: `match-${matchId++}`,
        round: 1,
        matchNumber: i / 2 + 1,
        player1: players[i],
        player2: players[i + 1],
        status: 'completed',
        winner: 'player1',
        score: { player1: 4, player2: 2 },
      });
    }
    rounds.push(matches);
  
    // Next rounds
    let prevWinners = matches.map(m => m.player1!);
    let roundNum = 2;
    while (prevWinners.length > 1) {
      matches = [];
      for (let i = 0; i < prevWinners.length; i += 2) {
        matches.push({
          id: `match-${matchId++}`,
          round: roundNum,
          matchNumber: i / 2 + 1,
          player1: prevWinners[i],
          player2: prevWinners[i + 1],
          status: prevWinners.length > 2 ? 'completed' : 'upcoming',
          winner: prevWinners.length > 2 ? 'player1' : undefined,
          score: prevWinners.length > 2 ? { player1: 4, player2: 2 } : undefined,
        });
      }
      rounds.push(matches);
      prevWinners = matches.map(m => m.player1!);
      roundNum++;
    }
  
    return {
      id: eventName.replace(/\s/g, '-').toLowerCase(),
      name: eventName,
      rounds,
    };
  }
  
  export function generateAllEvents(): TournamentEvent[] {
    const events: EventType[] = [
      "Men's Singles",
      "Women's Singles",
      "Men's Doubles",
      "Women's Doubles",
      "Mixed Doubles"
    ];
    return events.map(e => generateEvent(e, 128));
  }