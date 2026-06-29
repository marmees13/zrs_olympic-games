import React, { useState } from 'react';
import Button from './Button';
import { clearAllData } from '../utils/serverDataStore';
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
      alert('Bitte gib mindestens 2 Spieler ein');
    }
  };

  const handleResetAllData = async () => {
    if (window.confirm('⚠️ Alle Daten löschen? (Spieler, Spiele, Ergebnisse, Punkte)\n\nDies kann nicht rückgängig gemacht werden!')) {
      await clearAllData();
      window.location.reload();
    }
  };

  return (
    <div className="start-page">
      {isAdmin && (
        <button className="logout-btn" onClick={onLogout}>🚪 Abmelden</button>
      )}
      <div className="start-container">
        <h1 className="start-title">🏅 ZRS Meisterschaft</h1>
        <p className="start-subtitle">
          {isAdmin ? '👑 Spielleiter-Modus' : '👀 Zuschauer-Modus'}
        </p>

        {isAdmin ? (
        <div className="setup-section">
          <h2>Spieler einrichten</h2>
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
            <h3>Spielernamen eingeben</h3>
            <div className="player-inputs">
              {playerNames.map((name, index) => (
                <div key={index} className="player-input-group">
                  <label>Spieler {index + 1}</label>
                  <input
                    type="text"
                    placeholder={`Spieler ${index + 1}`}
                    value={name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button 
            label="Olympiad starten" 
            onClick={handleStartGame}
            variant="success"
          />

          <Button 
            label="🔄 Alle Daten zurücksetzen" 
            onClick={handleResetAllData}
            variant="danger"
          />
        </div>
        ) : (
          <div className="viewer-message">
            <p>Willkommen bei den ZRS olympischen Spielen!</p>
            <p>Sie schauen sich diesen Event an. Punkte werden automatisch alle 10 Sekunden aktualisiert.</p>
            <Button 
              label="Spiele & Ergebnisse anschauen" 
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
