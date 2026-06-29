import React, { useState } from 'react';
import Button from './Button';
import './GameManager.css';

const GameManager = ({ games, onAddGame, onRemoveGame, onReorderGames }) => {
  const [newGameName, setNewGameName] = useState('');
  const [draggedGame, setDraggedGame] = useState(null);

  const handleAddGame = () => {
    if (newGameName.trim() && games.length < 10) {
      onAddGame(newGameName.trim());
      setNewGameName('');
    }
  };

  const handleDragStart = (e, gameId) => {
    setDraggedGame(gameId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetGameId) => {
    e.preventDefault();
    if (!draggedGame || draggedGame === targetGameId) return;

    const draggedIndex = games.findIndex(g => g.id === draggedGame);
    const targetIndex = games.findIndex(g => g.id === targetGameId);

    const newGames = [...games];
    const [movedGame] = newGames.splice(draggedIndex, 1);
    newGames.splice(targetIndex, 0, movedGame);

    onReorderGames(newGames);
    setDraggedGame(null);
  };

  const handleDragEnd = () => {
    setDraggedGame(null);
  };

  return (
    <div className="game-manager">
      <h2>Spiele verwalten</h2>
      
      <div className="add-game-section">
        <input
          type="text"
          placeholder="Spielname eingeben..."
          value={newGameName}
          onChange={(e) => setNewGameName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddGame()}
        />
        <Button 
          label="Spiel hinzufügen" 
          onClick={handleAddGame}
          variant="success"
          disabled={!newGameName.trim() || games.length >= 10}
        />
      </div>

      {games.length === 0 ? (
        <p className="no-games">Noch keine Spiele. Fügen Sie Ihr erstes Spiel hinzu!</p>
      ) : (
        <div className="games-list">
          <p className="games-info">📌 Ziehen zum Umordnen • Maximal 10 Spiele</p>
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`game-item ${draggedGame === game.id ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, game.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, game.id)}
              onDragEnd={handleDragEnd}
            >
              <span className="game-number">{index + 1}</span>
              <span className="game-name">{game.name}</span>
              <span className="drag-handle">⋮⋮</span>
              <Button 
                label="Entfernen"
                onClick={() => onRemoveGame(game.id)}
                variant="danger"
              />
            </div>
          ))}
        </div>
      )}

      <div className="game-info">
        <p>Insgesamt Spiele: {games.length}/10</p>
      </div>
    </div>
  );
};

export default GameManager;
