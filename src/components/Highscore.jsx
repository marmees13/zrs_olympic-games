import React from 'react';
import './Highscore.css';

const Highscore = ({ players, results, games }) => {
  // Calculate scores from results
  const playerScores = players.reduce((acc, player) => {
    acc[player.id] = 0;
    return acc;
  }, {});

  const pointsSystem = [6, 4, 3, 2, 1, 0];
  results.forEach(result => {
    result.rankings.forEach((playerId, position) => {
      if (playerScores[playerId] !== undefined) {
        playerScores[playerId] += pointsSystem[position] || 0;
      }
    });
  });

  // Sort players by score
  const sortedPlayers = [...players].sort((a, b) => playerScores[b.id] - playerScores[a.id]);

  const getGameResult = (gameId) => {
    return results.find(r => r.gameId === gameId);
  };

  const getPlayerPositionInGame = (playerId, gameId) => {
    const gameResult = getGameResult(gameId);
    if (!gameResult) return '-';
    
    const position = gameResult.rankings.indexOf(playerId);
    if (position === -1) return '-';
    
    const badges = ['🥇', '🥈', '🥉', '4th', '5th', '6th'];
    return badges[position] || `${position + 1}`;
  };

  const getPointsInGame = (playerId, gameId) => {
    const gameResult = getGameResult(gameId);
    if (!gameResult) return 0;
    
    const position = gameResult.rankings.indexOf(playerId);
    if (position === -1) return 0;
    
    const pointsSystem = [6, 4, 3, 2, 1, 0];
    return pointsSystem[position] || 0;
  };

  return (
    <div className="highscore">
      <h2>🏆 Bestenliste</h2>

      {sortedPlayers.length === 0 ? (
        <p className="no-data">Keine Spielerdaten</p>
      ) : (
        <div className="highscore-container">
          {/* Top 3 Podium */}
          {sortedPlayers.length >= 1 && (
            <div className="podium">
              {sortedPlayers.length >= 2 && (
                <div className="podium-place silver">
                  <div className="medal">🥈</div>
                  <div className="name">{sortedPlayers[1].name}</div>
                  <div className="score">{playerScores[sortedPlayers[1].id]} pts</div>
                </div>
              )}
              
              {sortedPlayers.length >= 1 && (
                <div className="podium-place gold">
                  <div className="medal">🥇</div>
                  <div className="name">{sortedPlayers[0].name}</div>
                  <div className="score">{playerScores[sortedPlayers[0].id]} pts</div>
                </div>
              )}
              
              {sortedPlayers.length >= 3 && (
                <div className="podium-place bronze">
                  <div className="medal">🥉</div>
                  <div className="name">{sortedPlayers[2].name}</div>
                  <div className="score">{playerScores[sortedPlayers[2].id]} pts</div>
                </div>
              )}
            </div>
          )}

          {/* Full Leaderboard */}
          <div className="leaderboard">
            <div className="leaderboard-header">
              <div className="rank">Rang</div>
              <div className="name-col">Spieler</div>
              <div className="total-score">Gesamt</div>
            </div>

            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="leaderboard-row">
                <div className="rank">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                <div className="name-col">{player.name}</div>
                <div className="total-score">{playerScores[player.id]}</div>
              </div>
            ))}
          </div>

          {/* Detailed Results Table */}
          {results.length > 0 && (
            <div className="detailed-results">
              <h3>Detaillierte Ergebnisse</h3>
              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Spieler</th>
                      {games.map(game => (
                        <th key={game.id}>{game.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPlayers.map(player => (
                      <tr key={player.id}>
                        <td className="player-name">{player.name}</td>
                        {games.map(game => (
                          <td key={game.id} className="result-cell">
                            {getPointsInGame(player.id, game.id)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {results.length === 0 && (
            <div className="no-results">
              <p>Noch keine Ergebnisse eingegeben. Gehen Sie zur Registerkarte "Ergebnisse", um Spielergebnisse einzugeben!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Highscore;
