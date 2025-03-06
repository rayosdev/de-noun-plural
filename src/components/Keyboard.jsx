import React from 'react';
import { useGameStore } from '../store/gameStore';

const Keyboard = () => {
  const { guessedLetters, makeGuess } = useGameStore();
  
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß']
  ];

  return (
    <div className="mt-4">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              className={`letter-button ${guessedLetters.includes(letter) ? 'primary' : 'tertiary'}`}
              onClick={() => makeGuess(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
