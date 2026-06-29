# Railway Deployment Guide

## Quick Start on Railway.app

### 1. Connect Your GitHub Repository

1. Go to [railway.app](https://railway.app)
2. Sign up or log in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your `zrs_olympic-games` repository
5. Railway will automatically detect the `railway.toml` file ✅

### 2. Configure Environment

The server will automatically:
- Run on PORT assigned by Railway (usually 8080, 3000, etc.)
- Store data in `data.json` in the project directory
- Start with: `npm run server`

### 3. Get Your Backend URL

After deployment:
1. Go to your Railway project dashboard
2. Click the service
3. Copy the **Domain** (looks like: `https://zrs-olympic-games-production-xxxx.railway.app`)
4. This is your `API_BASE_URL` for the frontend

### 4. Deploy Frontend to GitHub Pages

On your local machine:

```bash
# Set environment variable
$env:REACT_APP_API_URL = "https://zrs-olympic-games-production-xxxx.railway.app"

# Build and deploy
npm run build
npm run deploy
```

Or on Windows (PowerShell):
```powershell
$env:REACT_APP_API_URL = "https://zrs-olympic-games-production-xxxx.railway.app"
npm run deploy
```

### 5. Test Production

1. Open your **GitHub Pages URL** (e.g., `https://marmees13.github.io/zrs-olympic-games`)
2. Browser 1 → Choose **Spielleiter** → Add players, update scores
3. Browser 2 (different device) → Choose **Zuschauer** → See live updates every 10 seconds

## Files Required for Railway ✅

✅ **railway.toml** - Configuration (auto-detected by Railway)
✅ **package.json** - with `npm run server` script
✅ **server.js** - Express backend
✅ **src/utils/serverDataStore.js** - Frontend API client
✅ **.gitignore** - includes node_modules (should not include data.json so it syncs)

## How Railway Works

1. **Detects** `railway.toml` in repo root
2. **Installs** dependencies: `npm install`
3. **Starts** server: `npm run server`
4. **Runs** on auto-assigned PORT
5. **Persists** data in `data.json`
6. **Provides** public URL for API calls

## Important Notes

- **Data Persistence**: Railway ephemeral filesystem means `data.json` may reset on redeploy
  - For persistent database, upgrade to Railway PostgreSQL add-on
  - For now, data persists between requests but resets on Railway restart

- **CORS**: Already configured in `server.js` to allow requests from any origin
  - Safe for GitHub Pages deployment

- **PORT**: Server auto-detects Railway's PORT (no need to hardcode 3001 in production)
  - server.js uses: `process.env.PORT || 3001` ✅

## Troubleshooting

### Deploy button grayed out?
- Ensure `railway.toml` is committed to GitHub
- Wait 30 seconds, refresh page

### "Cannot reach server" error?
- Check Railway logs in dashboard
- Verify backend URL is correct in frontend `.env`
- Ensure CORS headers are sent

### Data resets on redeploy?
- Railway's filesystem is ephemeral
- Use PostgreSQL for persistent storage:
  - In Railway dashboard: **Add** → **Postgres**
  - Update server.js to use postgres instead of JSON file

### 502 Bad Gateway?
- Check Railway logs for server startup errors
- Ensure `npm run server` works locally: `node server.js`

## Commands for Local Testing Before Deploy

```bash
# Start backend (Port 3001)
node server.js

# In another terminal, start frontend (Port 8080)
npm run dev

# Test in browsers:
# - Admin: http://localhost:8080 (Spielleiter)
# - Viewer: http://localhost:8080 (Zuschauer)
```

## Next: Database (Optional Upgrade)

If you need persistent data across Railway redeploys:

1. In Railway dashboard: **Add** → **Postgres**
2. Copy CONNECTION STRING
3. Update server.js to use Postgres instead of JSON file
4. Redeploy

For now, JSON file works for testing multi-location sync! 🎮
