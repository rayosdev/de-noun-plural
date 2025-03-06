import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import HangmanDrawing from './HangmanDrawing';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import GameStatus from './GameStatus';

const Game = () => {
  const { 
    currentWord, 
    gameStatus, 
    startNewGame,
    wrongGuesses,
    hints
  } = useGameStore();

  // Start a new game when component mounts
  useEffect(() => {
    if (!currentWord) {
      startNewGame();
    }
  }, [currentWord, startNewGame]);

  if (!currentWord) {
    return <div className="card text-center">Loading game...</div>;
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 flex justify-center">
          <HangmanDrawing wrongGuesses={wrongGuesses} />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-center mb-4">Guess the article and plural!</h2>
          
          <WordDisplay />
          
          {hints.length > 0 && (
            <div className="card mb-4 alert-warning">
              <h3>Hints:</h3>
              <ul className="hint-text">
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
          
          {gameStatus === 'playing' ? (
            <Keyboard />
          ) : (
            <GameStatus />
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
