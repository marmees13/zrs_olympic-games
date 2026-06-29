import React, { useState } from 'react';
import GameManager from './GameManager';
import ResultsEntry from './ResultsEntry';
import Highscore from './Highscore';
import Button from './Button';
import { clearAllData } from '../utils/serverDataStore';
import './GameOlympiad.css';

const GameOlympiad = ({ players, games, results, onGamesChange, onResultsChange, onPlayersChange, onBack, isAdmin, onLogout, lastUpdate }) => {
  const [activeTab, setActiveTab] = useState(isAdmin ? 'players' : 'highscore');
  const [localResults, setLocalResults] = useState(results);
  const [playerCount, setPlayerCount] = useState(players.length || 4);
  const [playerNames, setPlayerNames] = useState(players.map(p => p.name) || ['', '', '', '']);

  const handleGameResult = (gameId, rankings) => {
    const pointsSystem = [6, 4, 3, 2, 1, 0];
    
    // Transform rankings array to include both playerId and points
    const rankingsWithPoints = rankings.map((playerId, position) => ({
      playerId,
      points: pointsSystem[position] || 0,
    }));
    
    const newResults = localResults.filter(r => r.gameId !== gameId);
    
    newResults.push({
      gameId,
      rankings: rankingsWithPoints,
      timestamp: new Date().toISOString(),
    });
    setLocalResults(newResults);
    onResultsChange(newResults);
  };

  const getGameResult = (gameId) => {
    return localResults.find(r => r.gameId === gameId);
  };

  // Delete individual player
  const handleDeletePlayer = (playerId) => {
    if (window.confirm(`Spieler wirklich löschen? Alle Punkte gehen verloren!`)) {
      onGamesChange(games);
      // Remove player and their results
      const newResults = localResults.filter(r => !r.rankings.some(rank => rank.playerId === playerId));
      setLocalResults(newResults);
      onResultsChange(newResults);
    }
  };

  // Delete individual result
  const handleDeleteResult = (gameId) => {
    if (window.confirm(`Ergebnis von "${games.find(g => g.id === gameId)?.name}" löschen?`)) {
      const newResults = localResults.filter(r => r.gameId !== gameId);
      setLocalResults(newResults);
      onResultsChange(newResults);
    }
  };

  // Delete individual player's points from a game
  const handleDeletePlayerPoints = (gameId, playerId) => {
    if (window.confirm(`Punkte löschen?`)) {
      const newResults = localResults.map(r => {
        if (r.gameId === gameId) {
          return {
            ...r,
            rankings: r.rankings.filter(rank => rank.playerId !== playerId),
          };
        }
        return r;
      }).filter(r => r.rankings.length > 0);
      setLocalResults(newResults);
      onResultsChange(newResults);
    }
  };

  // Calculate total points per player
  const getPlayerTotalPoints = (playerId) => {
    return localResults.reduce((total, result) => {
      const ranking = result.rankings.find(r => r.playerId === playerId);
      return total + (ranking ? ranking.points : 0);
    }, 0);
  };

  // Player management functions
  const handlePlayerCountChange = (count) => {
    setPlayerCount(count);
    setPlayerNames(
      Array(count)
        .fill('')
        .map((_, i) => playerNames[i] || `Spieler ${i + 1}`)
    );
  };

  const handlePlayerNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSavePlayers = () => {
    const newPlayers = playerNames
      .map((name, index) => ({
        id: index,
        name: name.trim() || `Spieler ${index + 1}`,
      }))
      .filter((player) => player.name);

    if (newPlayers.length >= 2) {
      onPlayersChange(newPlayers);
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
    <div className="game-olympiad">
      <div className="olympiad-header">
        <div className="header-left">
          <h1>🏅 ZRS Meisterschaft</h1>
          {!isAdmin && (
            <span className="viewer-mode-indicator">👀 Zuschauer-Modus • Zuletzt aktualisiert: {new Date(lastUpdate).toLocaleTimeString()}</span>
          )}
        </div>
        <div className="header-right">
          <Button 
            label="🚪 Abmelden" 
            onClick={onLogout}
            variant="danger"
          />
        </div>
      </div>

      <div className="tabs">
        {isAdmin && (
          <button 
            className={`tab-btn ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
          >
            👥 Spieler
          </button>
        )}
        {isAdmin && (
          <button 
            className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => setActiveTab('games')}
          >
            🎮 Spiele
          </button>
        )}
        {isAdmin && (
          <button 
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            📝 Ergebnisse
          </button>
        )}
        {isAdmin && (
          <button 
            className={`tab-btn ${activeTab === 'dataManagement' ? 'active' : ''}`}
            onClick={() => setActiveTab('dataManagement')}
          >
            📊 Datenverwaltung
          </button>
        )}
        <button 
          className={`tab-btn ${activeTab === 'highscore' ? 'active' : ''}`}
          onClick={() => setActiveTab('highscore')}
        >
          🏆 Bestenliste
        </button>
      </div>

      <div className="tab-content">
        {isAdmin && activeTab === 'players' && (
          <div className="players-management">
            <h2>👥 Spieler verwalten</h2>
            
            <div className="player-count-selector">
              <label>Anzahl Spieler:</label>
              <div className="count-buttons">
                {[2, 3, 4, 5, 6, 7, 8].map(count => (
                  <button
                    key={count}
                    className={`count-btn ${playerCount === count ? 'active' : ''}`}
                    onClick={() => handlePlayerCountChange(count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="player-inputs">
              {playerNames.map((name, index) => (
                <div key={index} className="player-input-group">
                  <label>Spieler {index + 1}:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    placeholder={`Spieler ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="players-actions">
              <Button
                label="💾 Spieler speichern"
                onClick={handleSavePlayers}
                variant="primary"
              />
            </div>
          </div>
        )}

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

        {isAdmin && activeTab === 'dataManagement' && (
          <div className="data-management">
            <div className="data-section">
              <h2>👥 Spieler & Punkte</h2>
              <div className="players-list">
                {players.length === 0 ? (
                  <p className="empty-state">Keine Spieler vorhanden</p>
                ) : (
                  players.map(player => (
                    <div key={player.id} className="player-card">
                      <div className="player-info">
                        <h3>{player.name}</h3>
                        <div className="player-stats">
                          <span className="total-points">Total: {getPlayerTotalPoints(player.id)} Punkte</span>
                        </div>
                      </div>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeletePlayer(player.id)}
                        title="Spieler und alle Punkte löschen"
                      >
                        🗑️ Spieler löschen
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="data-section">
              <h2>🎮 Ergebnisse Details</h2>
              <div className="results-table-container">
                {localResults.length === 0 ? (
                  <p className="empty-state">Keine Ergebnisse vorhanden</p>
                ) : (
                  <>
                    {games.map(game => {
                      const gameResult = localResults.find(r => r.gameId === game.id);
                      if (!gameResult) return null;
                      
                      return (
                        <div key={game.id} className="game-result-section">
                          <div className="game-header">
                            <h3>{game.name}</h3>
                            <button 
                              className="btn-delete-small"
                              onClick={() => handleDeleteResult(game.id)}
                              title="Gesamtes Ergebnis löschen"
                            >
                              🗑️ Löschen
                            </button>
                          </div>
                          <div className="rankings-list">
                            {gameResult.rankings.map((ranking, idx) => {
                              const playerName = players.find(p => p.id === ranking.playerId)?.name || 'Unbekannt';
                              return (
                                <div key={ranking.playerId} className="ranking-item">
                                  <span className="rank-badge">{idx + 1}.</span>
                                  <span className="player-name">{playerName}</span>
                                  <span className="points">{ranking.points} Punkte</span>
                                  <button 
                                    className="btn-delete-small"
                                    onClick={() => handleDeletePlayerPoints(game.id, ranking.playerId)}
                                    title="Diese Punkte löschen"
                                  >
                                    ✕
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
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
