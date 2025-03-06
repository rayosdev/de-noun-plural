import React from 'react';
import { useGameStore } from '../store/gameStore';
import { FaHistory, FaQuestionCircle } from 'react-icons/fa';

const Header = () => {
  const { score, gamesPlayed, toggleHistory } = useGameStore();

  return (
    <header className="card mb-4">
      <div className="flex justify-between items-center">
        <h1>German Noun Gender & Plural Hangman</h1>
        <div className="flex gap-2">
          <button className="tertiary flex items-center gap-2" onClick={toggleHistory}>
            <FaHistory /> History
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p><strong>Score:</strong> {score} points</p>
          <p><strong>Games Played:</strong> {gamesPlayed}</p>
        </div>
        <div>
          <button 
            className="tertiary flex items-center gap-2"
            onClick={() => {
              alert(`
                Game Rules:
                - Guess the singular article (der, die, das) and plural form of the given German noun
                - You have 6 wrong guesses before losing
                - After 2 wrong guesses, you'll get a hint about the plural pattern
                - After 4 wrong guesses, you'll get a hint about the singular article
                - Score: 2 points for solving without hints, 1 point with hints, 0 points for losing
              `);
            }}
          >
            <FaQuestionCircle /> Rules
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
