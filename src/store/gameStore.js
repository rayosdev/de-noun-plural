import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { germanWords } from '../data/words';

// Helper to get a random word from the list
const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

// Initial game state
const initialGameState = {
  currentWord: null,
  guessedLetters: [],
  wrongGuesses: 0,
  hints: [],
  gameStatus: 'playing', // 'playing', 'won', 'lost'
  score: 0,
  gamesPlayed: 0,
  showHistory: false,
  gameHistory: [],
  hintsUsed: 0,
};

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialGameState,

      // Start a new game
      startNewGame: () => {
        const word = getRandomWord(germanWords);
        
        set({
          currentWord: word,
          guessedLetters: [],
          wrongGuesses: 0,
          hints: [],
          gameStatus: 'playing',
          hintsUsed: 0,
        });
      },

      // Make a guess
      makeGuess: (letter) => {
        const { currentWord, guessedLetters, wrongGuesses, gameStatus, hintsUsed } = get();
        
        if (gameStatus !== 'playing' || guessedLetters.includes(letter)) {
          return;
        }
        
        const newGuessedLetters = [...guessedLetters, letter];
        
        // Check if the letter is in either the singular article or plural form
        const singularArticle = currentWord.singularArticle;
        const pluralForm = `die ${currentWord.pluralForm}`;
        const combinedWord = `${singularArticle} ${currentWord.singular} ${pluralForm}`;
        
        const isCorrectGuess = combinedWord.toLowerCase().includes(letter.toLowerCase());
        
        let newWrongGuesses = wrongGuesses;
        if (!isCorrectGuess) {
          newWrongGuesses = wrongGuesses + 1;
        }
        
        // Determine if the game is won
        const allLettersGuessed = [...new Set(combinedWord.toLowerCase().replace(/\s/g, ''))]
          .filter(char => /[a-zäöüß]/i.test(char))
          .every(char => 
            newGuessedLetters.includes(char.toLowerCase()) || 
            char.toLowerCase() === currentWord.singular.toLowerCase()
          );
        
        let newGameStatus = 'playing';
        let newScore = get().score;
        let newHints = [...get().hints];
        
        // Add hint if necessary
        if (newWrongGuesses === 2 && newHints.length === 0) {
          newHints.push(currentWord.pluralHint);
          set({ hintsUsed: hintsUsed + 1 });
        } else if (newWrongGuesses === 4 && newHints.length === 1) {
          newHints.push(`The singular article is "${currentWord.singularArticle}"`);
          set({ hintsUsed: hintsUsed + 1 });
        }
        
        // Check game status
        if (allLettersGuessed) {
          newGameStatus = 'won';
          newScore = newScore + (hintsUsed === 0 ? 2 : 1);
          
          // Add to history
          const historyEntry = {
            word: currentWord,
            date: new Date().toISOString(),
            result: 'won',
            wrongGuesses: newWrongGuesses,
            hintsUsed,
            pointsEarned: (hintsUsed === 0 ? 2 : 1)
          };
          
          set(state => ({
            gameHistory: [historyEntry, ...state.gameHistory],
            gamesPlayed: state.gamesPlayed + 1
          }));
        } else if (newWrongGuesses >= 6) {
          newGameStatus = 'lost';
          
          // Add to history
          const historyEntry = {
            word: currentWord,
            date: new Date().toISOString(),
            result: 'lost',
            wrongGuesses: newWrongGuesses,
            hintsUsed,
            pointsEarned: 0
          };
          
          set(state => ({
            gameHistory: [historyEntry, ...state.gameHistory],
            gamesPlayed: state.gamesPlayed + 1
          }));
        }
        
        set({
          guessedLetters: newGuessedLetters,
          wrongGuesses: newWrongGuesses,
          gameStatus: newGameStatus,
          score: newScore,
          hints: newHints
        });
      },
      
      // Toggle history modal
      toggleHistory: () => set(state => ({ showHistory: !state.showHistory })),
      
      // Reset game (for testing)
      resetGame: () => set(initialGameState),
      
      // Clear history
      clearHistory: () => set({ gameHistory: [], score: 0, gamesPlayed: 0 }),
    }),
    {
      name: 'german-hangman-storage',
    }
  )
);
