import React, { useState } from 'react';
import Button from './Button';
import './StartPage.css';

const StartPage = ({ onStart, isAdmin, onLogout }) => {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(['', '', '', '']);

  const handlePlayerCountChange = (count) => {
    setPlayerCount(count);
    setPlayerNames(
      Array(count)
        .fill('')
        .map((_, i) => playerNames[i] || `Player ${i + 1}`)
    );
  };

  const handlePlayerNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const players = playerNames
      .map((name, index) => ({
        id: index,
        name: name.trim() || `Player ${index + 1}`,
        points: 0,
      }))
      .filter((player) => player.name);

    if (players.length >= 2) {
      onStart(players);
    } else {
      alert('Please enter at least 2 players');
    }
  };

  return (
    <div className="start-page">
      {isAdmin && (
        <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
      )}
      <div className="start-container">
        <h1 className="start-title">🏅 Game Olympiad</h1>
        <p className="start-subtitle">
          {isAdmin ? '👑 Admin Mode' : '👀 Viewer Mode'}
        </p>

        {isAdmin ? (
        <div className="setup-section">
          <h2>Setup Players</h2>
          <div className="player-count-selector">
            {[4, 5, 6].map((count) => (
              <button
                key={count}
                className={`count-btn ${playerCount === count ? 'active' : ''}`}
                onClick={() => handlePlayerCountChange(count)}
              >
                {count}
              </button>
            ))}
          </div>

          <div className="player-names-section">
            <h3>Enter Player Names</h3>
            <div className="player-inputs">
              {playerNames.map((name, index) => (
                <div key={index} className="player-input-group">
                  <label>Player {index + 1}</label>
                  <input
                    type="text"
                    placeholder={`Player ${index + 1}`}
                    value={name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button 
            label="Start Olympiad" 
            onClick={handleStartGame}
            variant="success"
          />
        </div>
        ) : (
          <div className="viewer-message">
            <p>Welcome to the Game Olympiad!</p>
            <p>You are viewing this event. Scores update automatically every 2 seconds.</p>
            <Button 
              label="View Games & Scores" 
              onClick={handleStartGame}
              variant="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPage;
