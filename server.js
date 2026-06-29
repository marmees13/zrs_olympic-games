const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize data file if it doesn't exist
const initializeDataFile = () => {
  if (!fs.existsSync(DATA_FILE)) {
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }
};

// Get all data
app.get('/api/data', (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      initializeDataFile();
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Update players
app.post('/api/players', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.players = req.body;
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating players:', error);
    res.status(500).json({ error: 'Failed to update players' });
  }
});

// Update games
app.post('/api/games', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.games = req.body;
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating games:', error);
    res.status(500).json({ error: 'Failed to update games' });
  }
});

// Update results
app.post('/api/results', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.results = req.body;
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating results:', error);
    res.status(500).json({ error: 'Failed to update results' });
  }
});

// Reset all data
app.post('/api/reset', (req, res) => {
  try {
    initializeDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json({ success: true, message: 'Data reset', data });
  } catch (error) {
    console.error('Error resetting data:', error);
    res.status(500).json({ error: 'Failed to reset data' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Initialize data file on startup
initializeDataFile();

app.listen(PORT, () => {
  console.log(`🎮 Server running on http://localhost:${PORT}`);
  console.log(`📂 Data stored in: ${DATA_FILE}`);
});
