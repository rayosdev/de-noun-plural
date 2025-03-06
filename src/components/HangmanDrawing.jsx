import React from 'react';

const HangmanDrawing = ({ wrongGuesses }) => {
  // SVG parts for hangman, drawn progressively as wrong guesses increase
  const hangmanParts = [
    // Gallows
    <g key="gallows">
      <line x1="60" y1="20" x2="140" y2="20" stroke="black" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="black" strokeWidth="4" />
      <line x1="60" y1="20" x2="60" y2="230" stroke="black" strokeWidth="4" />
      <line x1="40" y1="230" x2="100" y2="230" stroke="black" strokeWidth="4" />
    </g>,
    // Head
    <circle key="head" cx="140" cy="80" r="30" stroke="black" strokeWidth="4" fill="transparent" />,
    // Body
    <line key="body" x1="140" y1="110" x2="140" y2="170" stroke="black" strokeWidth="4" />,
    // Left arm
    <line key="leftArm" x1="140" y1="130" x2="110" y2="150" stroke="black" strokeWidth="4" />,
    // Right arm
    <line key="rightArm" x1="140" y1="130" x2="170" y2="150" stroke="black" strokeWidth="4" />,
    // Left leg
    <line key="leftLeg" x1="140" y1="170" x2="120" y2="210" stroke="black" strokeWidth="4" />,
    // Right leg
    <line key="rightLeg" x1="140" y1="170" x2="160" y2="210" stroke="black" strokeWidth="4" />
  ];

  return (
    <div className="hangman-drawing">
      <svg width="200" height="250" viewBox="0 0 200 250">
        {/* Always show the gallows */}
        {hangmanParts[0]}
        
        {/* Show parts based on wrong guesses */}
        {hangmanParts.slice(1, wrongGuesses + 1)}
      </svg>
    </div>
  );
};

export default HangmanDrawing;
