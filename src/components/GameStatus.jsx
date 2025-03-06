import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameStatus = () => {
  const { gameStatus, startNewGame, currentWord, hintsUsed } = useGameStore();
  
  let message = '';
  let statusClass = '';
  let pointsEarned = 0;
  
  if (gameStatus === 'won') {
    pointsEarned = hintsUsed === 0 ? 2 : 1;
    message = `Congratulations! You won! You earned ${pointsEarned} point${pointsEarned > 1 ? 's' : ''}.`;
    statusClass = 'alert-success';
  } else if (gameStatus === 'lost') {
    message = 'Sorry, you lost this round.';
    statusClass = 'alert-danger';
  }
  
  return (
    <div className="mt-4">
      <div className={`alert ${statusClass}`}>
        <p>{message}</p>
        <p>
          The correct answer was: <strong>{currentWord.singularArticle} {currentWord.singular}</strong> (plural: <strong>die {currentWord.pluralForm}</strong>)
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button className="primary" onClick={startNewGame}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
