import React from 'react';
import { useGameStore } from '../store/gameStore';
import { FaTimes, FaTrash } from 'react-icons/fa';

const HistoryModal = ({ onClose }) => {
  const { gameHistory, clearHistory } = useGameStore();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your game history? This cannot be undone.')) {
      clearHistory();
    }
  };
  
  // Group history by date (just the date part, not time)
  const groupedHistory = gameHistory.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(3px)' }}>
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Game History</h2>
          <div className="flex gap-2">
            {gameHistory.length > 0 && (
              <button 
                className="danger flex items-center gap-2" 
                onClick={handleClearHistory}
              >
                <FaTrash /> Clear
              </button>
            )}
            <button 
              className="tertiary" 
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          {gameHistory.length === 0 ? (
            <p className="text-center text-gray-500 my-4">No game history yet. Start playing to track your progress!</p>
          ) : (
            Object.entries(groupedHistory).map(([date, entries]) => (
              <div key={date} className="mb-6">
                <h3 className="mb-2 font-medium">{date}</h3>
                <div className="space-y-3">
                  {entries.map((entry, index) => (
                    <div key={index} className={`card ${entry.result === 'won' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">
                          {entry.word.singularArticle} {entry.word.singular} / die {entry.word.pluralForm}
                        </h4>
                        <span className={`badge ${entry.result === 'won' ? 'alert-success' : 'alert-danger'}`}>
                          {entry.result === 'won' ? 'Won' : 'Lost'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div>
                          <p><strong>Time:</strong> {formatDate(entry.date)}</p>
                        </div>
                        <div>
                          <p><strong>Wrong Guesses:</strong> {entry.wrongGuesses}/6</p>
                        </div>
                        <div>
                          <p><strong>Hints Used:</strong> {entry.hintsUsed}</p>
                        </div>
                      </div>
                      <p className="mt-2">
                        <strong>Points:</strong> {entry.pointsEarned}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
