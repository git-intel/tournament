import React, { useState } from 'react';
import styled from 'styled-components';
// import { generateAllEvents } from './data/generateTournamentData';
import { eventToFlow } from './utils/bracketToFlow';
import BracketFlow from './components/BracketFlow';
import { generateAllEvents } from './data/generateTournamentData';

const events = generateAllEvents();

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#007bff' : '#e9ecef')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function App() {
  const [selected, setSelected] = useState(0);
  const event = events[selected];
  const { nodes, edges } = eventToFlow(event);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: 'center' }}>World Table Tennis Championship 2024</h1>
      <Tabs>
        {events.map((e, i) => (
          <Tab key={e.id} active={i === selected} onClick={() => setSelected(i)}>
            {e.name}
          </Tab>
        ))}
      </Tabs>
      <BracketFlow nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;