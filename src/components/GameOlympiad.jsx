import React, { useState } from 'react';
import GameManager from './GameManager';
import ResultsEntry from './ResultsEntry';
import Highscore from './Highscore';
import Button from './Button';
import './GameOlympiad.css';

const GameOlympiad = ({ players, games, results, onGamesChange, onResultsChange, onBack, isAdmin, onLogout, lastUpdate }) => {
  const [activeTab, setActiveTab] = useState('games');
  const [localResults, setLocalResults] = useState(results);

  const handleGameResult = (gameId, rankings) => {
    const pointsSystem = [6, 4, 3, 2, 1, 0];
    
    const newResults = localResults.filter(r => r.gameId !== gameId);
    
    newResults.push({
      gameId,
      rankings,
      timestamp: new Date().toISOString(),
    });
    setLocalResults(newResults);
    onResultsChange(newResults);
  };

  const getGameResult = (gameId) => {
    return localResults.find(r => r.gameId === gameId);
  };

  return (
    <div className="game-olympiad">
      <div className="olympiad-header">
        <div className="header-left">
          <h1>🏅 Game Olympiad</h1>
          {!isAdmin && (
            <span className="viewer-mode-indicator">👀 Viewer Mode • Last update: {new Date(lastUpdate).toLocaleTimeString()}</span>
          )}
        </div>
        <div className="header-right">
          <Button 
            label="← Back" 
            onClick={onBack}
            variant="secondary"
          />
          <Button 
            label="🚪 Logout" 
            onClick={onLogout}
            variant="danger"
          />
        </div>
      </div>

      <div className="tabs">
        {isAdmin && (
          <button 
            className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            🎮 Games
          </button>
        )}
        {isAdmin && (
          <button 
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            📝 Results
          </button>
        )}
        <button 
          className={`tab-btn ${activeTab === 'highscore' ? 'active' : ''}`}
          onClick={() => setActiveTab('highscore')}
        >
          🏆 Highscore
        </button>
      </div>

      <div className="tab-content">
        {isAdmin && activeTab === 'games' && (
          <GameManager 
            games={games}
            onAddGame={(gameName) => {
              const newGame = {
                id: Math.max(...games.map(g => g.id), 0) + 1,
                name: gameName,
              };
              onGamesChange([...games, newGame]);
            }}
            onRemoveGame={(gameId) => {
              onGamesChange(games.filter(g => g.id !== gameId));
              onResultsChange(localResults.filter(r => r.gameId !== gameId));
            }}
            onReorderGames={onGamesChange}
          />
        )}
        
        {isAdmin && activeTab === 'results' && (
          <ResultsEntry 
            games={games}
            players={players}
            onGameResult={handleGameResult}
            getGameResult={getGameResult}
          />
        )}
        
        {activeTab === 'highscore' && (
          <Highscore 
            players={players}
            results={localResults}
            games={games}
          />
        )}
      </div>
    </div>
  );
};

export default GameOlympiad;
