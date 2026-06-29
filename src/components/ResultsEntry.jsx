import React, { useState } from 'react';
import Button from './Button';
import './ResultsEntry.css';

const ResultsEntry = ({ games, players, onGameResult, getGameResult }) => {
  const [selectedGameId, setSelectedGameId] = useState(games.length > 0 ? games[0].id : null);
  const [rankings, setRankings] = useState([]);

  const selectedGame = games.find(g => g.id === selectedGameId);
  const gameResult = selectedGame ? getGameResult(selectedGame.id) : null;

  // Initialize rankings when game changes
  React.useEffect(() => {
    if (selectedGame && gameResult) {
      setRankings(gameResult.rankings);
    } else if (selectedGame) {
      setRankings([]);
    }
  }, [selectedGame, gameResult]);

  const handleRankingChange = (position, playerId) => {
    const newRankings = [...rankings];
    newRankings[position] = playerId;
    setRankings(newRankings);
  };

  const handleSaveResult = () => {
    if (rankings.length === 0) {
      alert('Bitte wähle mindestens den 1. Platz');
      return;
    }
    if (new Set(rankings).size !== rankings.length) {
      alert('Jede Position muss einen anderen Spieler haben');
      return;
    }
    onGameResult(selectedGameId, rankings);
    alert('Ergebnis gespeichert!');
  };

  const unrankedPlayers = players.filter(
    p => !rankings.includes(p.id)
  );

  const pointsSystem = [6, 4, 3, 2, 1, 0];

  return (
    <div className="results-entry">
      <h2>Spielergebnisse eingeben</h2>

      <div className="game-selector">
        <label>Spiel auswählen:</label>
        <select 
          value={selectedGameId || ''} 
          onChange={(e) => setSelectedGameId(parseInt(e.target.value))}
        >
          {games.map(game => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {games.length === 0 ? (
        <p className="no-games">Keine Spiele verfügbar. Erstellen Sie zuerst Spiele!</p>
      ) : selectedGame ? (
        <div className="rankings-section">
          <h3>{selectedGame.name} Rangfolge</h3>

          <div className="rankings-list">
            {rankings.map((playerId, position) => {
              const player = players.find(p => p.id === playerId);
              return (
                <div key={position} className="ranking-item">
                  <div className="position-badge">
                    {position === 0 ? '🥇' : position === 1 ? '🥈' : position === 2 ? '🥉' : `#${position + 1}`}
                  </div>
                  <div className="ranking-info">
                    <span className="player-name">{player?.name}</span>
                    <span className="points">+{pointsSystem[position] || 0} pts</span>
                  </div>
                  <Button
                    label="Entfernen"
                    onClick={() => {
                      const newRankings = rankings.filter((_, i) => i !== position);
                      setRankings(newRankings);
                    }}
                    variant="danger"
                  />
                </div>
              );
            })}
          </div>

          {unrankedPlayers.length > 0 && (
            <div className="add-ranking-section">
              <label>Spieler hinzufügen ({rankings.length + 1}. Platz):</label>
              <select 
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) {
                    const playerId = parseInt(e.target.value);
                    setRankings([...rankings, playerId]);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Wählen Sie einen Spieler...</option>
                {unrankedPlayers.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {rankings.length > 0 && (
            <div className="save-section">
              <Button 
                label="Ergebnis speichern" 
                onClick={handleSaveResult}
                variant="success"
              />
            </div>
          )}

          {gameResult && (
            <div className="result-saved">
              ✅ Ergebnis für dieses Spiel gespeichert
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ResultsEntry;
