import React, { useState } from 'react';
import styled from 'styled-components';
import type { Tournament, Match } from '../types/tournament';
import { calculateBracketLayout } from '../utils/bracketLayout';
interface BracketProps {
  tournament: Tournament;
}

interface MatchBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const BracketContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;
  background: #f8f9fa;
`;

const SVGContainer = styled.svg`
  width: 100%;
  height: 100%;
  min-height: 600px;
`;

const MatchBox = styled.rect<MatchBoxProps>`
  fill: white;
  stroke: #ccc;
  stroke-width: 2;
  cursor: pointer;
  rx: 4;
  ry: 4;
  &:hover {
    fill: #f0f0f0;
    stroke: #999;
  }
`;

const MatchText = styled.text`
  font-size: 12px;
  fill: #333;
`;

const PlayerName = styled(MatchText)`
  font-weight: 500;
`;

const ScoreText = styled(MatchText)`
  font-weight: bold;
`;

const ConnectingLine = styled.line`
  stroke: #ccc;
  stroke-width: 2;
`;

const RoundTitle = styled.text`
  font-size: 14px;
  font-weight: bold;
  fill: #666;
`;

const Bracket: React.FC<BracketProps> = ({ tournament }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Constants for layout
  const MATCH_WIDTH = 200;
  const MATCH_HEIGHT = 100;
  const ROUND_GAP = 100;
  const MATCH_GAP = 50;
  const layout = calculateBracketLayout(
    tournament,
    MATCH_WIDTH,
    MATCH_HEIGHT,
    ROUND_GAP,
    MATCH_GAP
  );
  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const renderConnectingLines = (roundIndex: number, matchIndex: number) => {
    if (roundIndex === tournament.rounds.length - 1) return null;

    const currentX = roundIndex * (MATCH_WIDTH + ROUND_GAP) + MATCH_WIDTH;
    const currentY = matchIndex * (MATCH_HEIGHT + MATCH_GAP) + MATCH_HEIGHT / 2;
    const nextX = (roundIndex + 1) * (MATCH_WIDTH + ROUND_GAP);
    const nextY = Math.floor(matchIndex / 2) * (MATCH_HEIGHT + MATCH_GAP) + MATCH_HEIGHT / 2;

    return (
      <g key={`line-${roundIndex}-${matchIndex}`}>
        <ConnectingLine
          x1={currentX}
          y1={currentY}
          x2={nextX}
          y2={nextY}
        />
      </g>
    );
  };

  const renderMatch = (match: Match, roundIndex: number, matchIndex: number) => {
    const x = roundIndex * (MATCH_WIDTH + ROUND_GAP);
    const y = matchIndex * (MATCH_HEIGHT + MATCH_GAP);

    return (
      <g key={match.id}>
        <MatchBox
          x={x}
          y={y}
          width={MATCH_WIDTH}
          height={MATCH_HEIGHT}
          onClick={() => handleMatchClick(match)}
        />
        <PlayerName x={x + 10} y={y + 25}>
          {match.player1.name}
        </PlayerName>
        <PlayerName x={x + 10} y={y + 50}>
          {match.player2.name}
        </PlayerName>
        {match.score && (
          <ScoreText x={x + 10} y={y + 75}>
            {match.score.player1} - {match.score.player2}
          </ScoreText>
        )}
        {renderConnectingLines(roundIndex, matchIndex)}
      </g>
    );
  };
  const renderMatches = () =>
    Object.values(layout).map(({ x, y, match }) => (
      <g key={match.id}>
        <MatchBox
          x={x}
          y={y}
          width={MATCH_WIDTH}
          height={MATCH_HEIGHT}
          onClick={() => handleMatchClick(match)}
        />
        {/* ...rest of match content */}
      </g>
    ));
  const renderRoundTitles = () => {
    return tournament.rounds.map((round, index) => (
      <RoundTitle
        key={round.id}
        x={index * (MATCH_WIDTH + ROUND_GAP)}
        y={20}
      >
        {round.name}
      </RoundTitle>
    ));
  };

  const calculateSVGDimensions = () => {
    const maxMatchesInRound = Math.max(...tournament.rounds.map(round => round.matches.length));
    const width = tournament.rounds.length * (MATCH_WIDTH + ROUND_GAP);
    const height = maxMatchesInRound * (MATCH_HEIGHT + MATCH_GAP) + 50; // Added padding for round titles

    return { width, height };
  };

  const { width, height } = calculateSVGDimensions();

  return (
    <BracketContainer>
      <SVGContainer width={width} height={height}>
        {renderRoundTitles()}
        {tournament.rounds.map((round, roundIndex) =>
          round.matches.map((match, matchIndex) =>
            renderMatch(match, roundIndex, matchIndex)
          )
        )}
      </SVGContainer>
      {selectedMatch && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3>Match Details</h3>
          <p>Status: {selectedMatch.status}</p>
          <p>
            {selectedMatch.player1.name} vs {selectedMatch.player2.name}
          </p>
          {selectedMatch.score && (
            <p>
              Score: {selectedMatch.score.player1} - {selectedMatch.score.player2}
            </p>
          )}
        </div>
      )}
    </BracketContainer>
  );
};

export default Bracket; 