import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import GameOlympiad from './components/GameOlympiad';
import { initializeData, getAppData, updateGames, updatePlayers, updateResults } from './utils/serverDataStore';
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
    const loadInitialData = async () => {
      const data = await initializeData();
      if (data) {
        setPlayers(data.players);
        setGames(data.games);
        setResults(data.results);
      }
      setMode('login');
    };
    loadInitialData();
  }, []);

  // Auto-refresh for viewers (every 10 seconds)
  useEffect(() => {
    if (mode === 'viewer' && gameStarted) {
      const interval = setInterval(async () => {
        const data = await getAppData();
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
    setGameStarted(true);
  };

  const handleContinueAsViewer = () => {
    setMode('viewer');
    setIsAdmin(false);
    setGameStarted(true);
  };

  const handleStartGame = async (playersData) => {
    setPlayers(playersData);
    await updatePlayers(playersData);
    setGameStarted(true);
  };

  const handlePlayersChange = async (playersData) => {
    setPlayers(playersData);
    await updatePlayers(playersData);
  };

  const handleBack = () => {
    setGameStarted(false);
    setPlayers([]);
  };

  const handleGamesChange = async (newGames) => {
    setGames(newGames);
    await updateGames(newGames);
  };

  const handleResultsChange = async (newResults) => {
    setResults(newResults);
    await updateResults(newResults);
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

      {(mode === 'admin' || mode === 'viewer') && gameStarted && (
        <GameOlympiad 
          players={players}
          games={games}
          results={results}
          onGamesChange={handleGamesChange}
          onResultsChange={handleResultsChange}
          onPlayersChange={handlePlayersChange}
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
