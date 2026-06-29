import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import StartPage from './components/StartPage';
import GameOlympiad from './components/GameOlympiad';
import { initializeData, getAppData, updateGames, updatePlayers, updateResults } from './utils/dataStore';
import './App.css';

const App = () => {
  const [mode, setMode] = useState(null); // 'login', 'admin', 'viewer'
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Initialize data on mount
  useEffect(() => {
    const data = initializeData();
    setPlayers(data.players);
    setGames(data.games);
    setResults(data.results);
    setMode('login');
  }, []);

  // Auto-refresh for viewers (every 10 seconds)
  useEffect(() => {
    if (mode === 'viewer' && gameStarted) {
      const interval = setInterval(() => {
        const data = getAppData();
        if (data) {
          setPlayers(data.players);
          setGames(data.games);
          setResults(data.results);
          setLastUpdate(Date.now());
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [mode, gameStarted]);

  const handleAdminLogin = () => {
    setMode('admin');
    setIsAdmin(true);
  };

  const handleContinueAsViewer = () => {
    setMode('viewer');
    setIsAdmin(false);
    setGameStarted(true);
  };

  const handleStartGame = (playersData) => {
    setPlayers(playersData);
    updatePlayers(playersData);
    setGameStarted(true);
  };

  const handleBack = () => {
    setGameStarted(false);
    setPlayers([]);
  };

  const handleGamesChange = (newGames) => {
    setGames(newGames);
    updateGames(newGames);
  };

  const handleResultsChange = (newResults) => {
    setResults(newResults);
    updateResults(newResults);
  };

  const handleLogout = () => {
    setMode('login');
    setGameStarted(false);
    setIsAdmin(false);
    setPlayers([]);
  };

  return (
    <div className="app">
      {mode === 'login' && (
        <AdminLogin 
          onAdminLogin={handleAdminLogin}
          onContinueAsViewer={handleContinueAsViewer}
        />
      )}

      {mode === 'admin' && !gameStarted && (
        <StartPage 
          onStart={handleStartGame}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />
      )}

      {(mode === 'admin' || mode === 'viewer') && gameStarted && (
        <GameOlympiad 
          players={players}
          games={games}
          results={results}
          onGamesChange={handleGamesChange}
          onResultsChange={handleResultsChange}
          onBack={handleBack}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          lastUpdate={lastUpdate}
        />
      )}
    </div>
  );
};

export default App;
