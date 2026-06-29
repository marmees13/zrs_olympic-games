# API Integration Guide

## Multi-Location Data Sync Setup

Your ZRS olympische Spiele app now supports **real-time data synchronization** across multiple locations and devices using a Node.js backend server.

### Architecture

- **Frontend**: React app (webpack bundled)
- **Backend**: Express.js server with JSON file storage
- **Communication**: REST API with CORS enabled
- **Data Flow**: Spielleiter (admin) updates → Server saves → Viewers fetch every 10 seconds

## Local Development Setup

### 1. Start the Backend Server

Open a terminal in the project root:

```bash
npm run server
```

Server runs at `http://localhost:3001`
- Data persisted to `data.json`
- API endpoints available at `/api/*`
- Static files served from `dist/` folder

### 2. Start the Frontend (in another terminal)

```bash
npm run dev
```

Frontend development server runs at `http://localhost:8080`

### 3. Test Multi-Location Sync

1. **Spielleiter Browser**: Open `http://localhost:8080`
   - Click "🔐 Spielleiter-Modus"
   - Enter password: `admin123`
   - Setup players and games
   - Change scores/results

2. **Viewer Browser**: Open `http://localhost:8080` (or different device on same network)
   - Click "👥 Zuschauer-Modus"
   - Viewer sees Spielleiter's data updated every 10 seconds
   - Try from different browsers/computers to verify sync

## API Endpoints

### GET `/api/data`
Fetches all data (players, games, results)
```json
{
  "players": [...],
  "games": [...],
  "results": [...],
  "lastUpdated": "2024-..."
}
```

### POST `/api/players`
Updates player list
```json
{ "players": [...] }
```

### POST `/api/games`
Updates game list
```json
{ "games": [...] }
```

### POST `/api/results`
Updates results
```json
{ "results": [...] }
```

### POST `/api/reset`
Clears all data and reinitializes defaults
```json
{ "message": "Data reset successfully", "data": {...} }
```

## Production Deployment

### Option 1: Deploy to Heroku (Free Alternative: Railway.app)

1. **Create account** on [Railway.app](https://railway.app)

2. **Add railway.toml** to project root:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm run server"
```

3. **Push to GitHub** and link to Railway via dashboard

4. **Set Environment Variables** in Railway:
   - PORT=3001 (auto-set by Railway)

5. **Note deployment URL** (e.g., `https://zrs-olympic-server.railway.app`)

### Option 2: Deploy to Render.com

1. Create account and new Web Service
2. Connect GitHub repository
3. Build command: `npm install`
4. Start command: `npm run server`
5. Environment: Node 18

### Option 3: Deploy to Fly.io

```bash
npm install -g flyctl
flyctl auth login
flyctl launch  # Follow prompts
flyctl deploy
```

## Frontend Configuration for Production

### 1. Create `.env` file in project root

```
REACT_APP_API_URL=https://zrs-olympic-server.railway.app
```

**Local development**: Leave unset (defaults to http://localhost:3001)
**Production**: Set to your deployed server URL

### 2. Build frontend

```bash
npm run build
```

### 3. Deploy frontend to GitHub Pages

```bash
npm run deploy
```

## Frontend/Backend Communication

The frontend uses `src/utils/serverDataStore.js` for all data operations:

- `initializeData()` - Fetch initial game list
- `getAppData()` - Fetch all data
- `updatePlayers(data)` - Send player list to server
- `updateGames(data)` - Send game list to server
- `updateResults(data)` - Send results to server
- `clearAllData()` - Reset everything

All functions use the `REACT_APP_API_URL` environment variable automatically.

## Troubleshooting

### "Cannot reach server" or "CORS error"

**Local**: 
- Ensure server running: `npm run server`
- Check http://localhost:3001 in browser

**Production**:
- Verify deployment URL is correct in `.env`
- Check backend deployment logs for errors
- Ensure CORS is enabled in server.js (already configured)

### Data not syncing between browsers

- Verify both browsers calling correct API URL
- Check browser console for fetch errors
- Ensure server `data.json` has write permissions
- Viewer refresh rate is 10 seconds - wait before checking updates

### "ECONNREFUSED" or port 3001 already in use

```bash
# Kill process on port 3001
lsof -i :3001  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess  # Windows
```

## File Structure

```
zrs_olympic-games/
├── server.js                    # Express backend
├── src/
│   ├── utils/
│   │   ├── dataStore.js        # OLD: localStorage (keep for reference)
│   │   └── serverDataStore.js  # NEW: API calls
│   ├── App.jsx                 # Updated: uses serverDataStore
│   └── components/
│       └── StartPage.jsx       # Updated: async clearAllData()
├── data.json                   # Server data (auto-created)
├── dist/                       # Built frontend
└── package.json               # Updated: express, cors added
```

## Next Steps

1. ✅ Backend server created (`server.js`)
2. ✅ Frontend updated to use API (`serverDataStore.js`)
3. ✅ Dependencies installed (`express`, `cors`)
4. 🔄 **TEST LOCALLY**: `npm run server` + `npm run dev`
5. 📦 **DEPLOY SERVER**: Choose Railway/Render/Fly.io
6. 🌐 **DEPLOY FRONTEND**: `npm run deploy`
7. 🧪 **TEST PRODUCTION**: Open GitHub Pages URL with admin + viewer in different browsers

## Notes

- Server stores data in `data.json` in project directory
- For persistent production storage, consider MongoDB or PostgreSQL (future enhancement)
- Viewer auto-refresh: 10 seconds (configurable in App.jsx useEffect)
- Spielleiter password: `admin123` (configurable in AdminLogin.jsx)
