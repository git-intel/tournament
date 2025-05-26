import React from 'react';
import styled from 'styled-components';
import Bracket from './components/Bracket';
import { mockTournament } from './data/mockTournament';
import { generateMockTournament } from './data/generateMockTournament';
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;
const tournament = generateMockTournament();

function App() {
  return (
    <AppContainer>
      <Title>{tournament.name}</Title>
      <Bracket tournament={tournament} />
    </AppContainer>
  );
}

export default App;