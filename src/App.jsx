import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import { useGameStore } from './store/gameStore';
import HistoryModal from './components/HistoryModal';

function App() {
  const { showHistory, toggleHistory } = useGameStore();

  return (
    <div className="container">
      <Header />
      <Game />
      {showHistory && <HistoryModal onClose={toggleHistory} />}
    </div>
  );
}

export default App;
