import React from 'react';
import { useGameStore } from '../store/gameStore';

const WordDisplay = () => {
  const { currentWord, guessedLetters, gameStatus } = useGameStore();

  const renderLetter = (letter, isRevealed = false) => {
    if (!letter.match(/[a-zäöüß]/i)) {
      return letter; // Space or other non-letter character
    }

    const isGuessed = guessedLetters.includes(letter.toLowerCase());
    const isNoun = currentWord.singular.toLowerCase().includes(letter.toLowerCase());
    
    // Always show the noun itself
    if (isNoun || isRevealed || isGuessed) {
      return letter;
    }
    
    return '_';
  };

  const renderWord = (word, isRevealed = false) => {
    return word.split('').map((letter, index) => renderLetter(letter, isRevealed)).join('');
  };

  // For the singular, we need to show the article + noun
  const singularDisplay = `${gameStatus !== 'playing' 
    ? currentWord.singularArticle
    : renderWord(currentWord.singularArticle)} ${currentWord.singular}`;

  // For the plural, we need to show "die" + pluralForm
  const pluralDisplay = `${gameStatus !== 'playing' 
    ? 'die'
    : renderWord('die')} ${gameStatus !== 'playing' 
      ? currentWord.pluralForm
      : renderWord(currentWord.pluralForm)}`;

  return (
    <div className="mb-4">
      <div className="card mb-2">
        <h3>Singular:</h3>
        <div className="word-display">{singularDisplay}</div>
      </div>
      <div className="card">
        <h3>Plural:</h3>
        <div className="word-display">{pluralDisplay}</div>
      </div>
    </div>
  );
};

export default WordDisplay;
