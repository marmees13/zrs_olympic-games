// Server-based data management for ZRS olympische Spiele
// This replaces localStorage with API calls to sync across devices

// Determine API URL based on environment
const getApiBaseUrl = () => {
  // Development: use localhost:3001
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  // Production: use same domain as frontend
  return `${window.location.protocol}//${window.location.host}`;
};

const API_BASE_URL = getApiBaseUrl();

export const initializeData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/data`);
    if (!response.ok) throw new Error('Failed to fetch initial data');
    return await response.json();
  } catch (error) {
    console.error('Error initializing data:', error);
    return null;
  }
};

export const getAppData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/data`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Error reading from server:', error);
    return null;
  }
};

export const updatePlayers = async (players) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(players),
    });
    if (!response.ok) throw new Error('Failed to update players');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error updating players:', error);
    return null;
  }
};

export const updateGames = async (games) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(games),
    });
    if (!response.ok) throw new Error('Failed to update games');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error updating games:', error);
    return null;
  }
};

export const updateResults = async (results) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results),
    });
    if (!response.ok) throw new Error('Failed to update results');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error updating results:', error);
    return null;
  }
};

export const getPlayers = async () => {
  const data = await getAppData();
  return data ? data.players : [];
};

export const getGames = async () => {
  const data = await getAppData();
  return data ? data.games : [];
};

export const getResults = async () => {
  const data = await getAppData();
  return data ? data.results : [];
};

export const clearAllData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to reset data');
    return await response.json();
  } catch (error) {
    console.error('Error resetting data:', error);
    return null;
  }
};
