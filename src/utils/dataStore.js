// LocalStorage data management for Game Olympiad

const STORAGE_KEY = 'game_olympiad_data';

export const initializeData = () => {
  const data = getAppData();
  if (!data) {
    const defaultData = {
      players: [],
      games: [
        { id: 1, name: 'Mario Kart' },
        { id: 2, name: 'Chess' },
        { id: 3, name: 'Foosball' },
        { id: 4, name: 'Ping Pong' },
        { id: 5, name: 'Darts' },
        { id: 6, name: 'Pool' },
      ],
      results: [],
      lastUpdated: new Date().toISOString(),
    };
    saveAppData(defaultData);
    return defaultData;
  }
  return data;
};

export const getAppData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const saveAppData = (data) => {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const updatePlayers = (players) => {
  const data = getAppData();
  if (data) {
    data.players = players;
    saveAppData(data);
  }
};

export const updateGames = (games) => {
  const data = getAppData();
  if (data) {
    data.games = games;
    saveAppData(data);
  }
};

export const updateResults = (results) => {
  const data = getAppData();
  if (data) {
    data.results = results;
    saveAppData(data);
  }
};

export const getPlayers = () => {
  const data = getAppData();
  return data ? data.players : [];
};

export const getGames = () => {
  const data = getAppData();
  return data ? data.games : [];
};

export const getResults = () => {
  const data = getAppData();
  return data ? data.results : [];
};

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
