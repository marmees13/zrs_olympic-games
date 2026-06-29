# ZRS Olympic Games - Deployment Guide

## Publishing to GitHub Pages

This app is ready to be published on GitHub Pages with admin and viewer modes.

### Prerequisites
- GitHub account
- Git installed
- Node.js and npm installed

### Deployment Steps

#### 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `zrs-olympic-games`
3. Clone it to your machine:
```bash
git clone https://github.com/YOUR_USERNAME/zrs-olympic-games.git
cd zrs-olympic-games
```

#### 2. Copy Project Files

Copy all files from your `ai_learnings` project to the repository directory, except:
- `node_modules/` folder
- `.git/` folder
- `dist/` folder

#### 3. Update Homepage URL

Edit `package.json` and replace `YOUR_USERNAME`:
```json
"homepage": "https://YOUR_USERNAME.github.io/zrs-olympic-games"
```

#### 4. Initialize Git and Push

```bash
git add .
git commit -m "Initial commit: Game Olympiad"
git branch -M main
git push -u origin main
```

#### 5. Build and Deploy

```bash
npm install
npm run deploy
```

This will create and push to the `gh-pages` branch automatically.

#### 6. Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "GitHub Pages"
3. Select "Deploy from a branch" (gh-pages)
4. Save

Your app will be live at: `https://YOUR_USERNAME.github.io/game-olympiad`

---

## How to Use

### Admin Mode
- **Password:** `admin123`
- **Capabilities:**
  - Create and manage players (4-6 players)
  - Add, remove, and reorder games
  - Enter game results
  - View live highscores
- **Access:** Only the admin with the password can modify settings

### Viewer Mode
- **Capabilities:**
  - View games and player list
  - View live results in highscore
  - See all results in real-time
- **Auto-Updates:** Scores refresh automatically every 2 seconds
- **Access:** Anyone with the link can access viewer mode

---

## Data Persistence

All data is stored in browser's `localStorage`:
- Players list
- Games list
- Results and scores
- Last update timestamp

Data persists across page reloads and browser sessions.

---

## Sharing the App

Share the URL with viewers:
```
https://YOUR_USERNAME.github.io/game-olympiad
```

1. Viewers will see the login page
2. They can click "Continue as Viewer" to watch
3. They'll see scores update automatically every 2 seconds
4. Only the admin (with password) can modify content

---

## Customization

### Change Admin Password
Edit `src/components/AdminLogin.jsx`:
```javascript
const correctPassword = 'your_new_password';
```

### Change Auto-Refresh Interval
Edit `src/App.jsx` in the useEffect for viewers:
```javascript
}, 2000); // Change 2000 (ms) to your desired interval
```

### Change Default Games
Edit `src/utils/dataStore.js`:
```javascript
games: [
  { id: 1, name: 'Your Game 1' },
  { id: 2, name: 'Your Game 2' },
  // ...
]
```

---

## Troubleshooting

**App not deploying?**
- Check that `homepage` in package.json matches your GitHub username
- Ensure gh-pages branch exists in repository settings

**Shared link doesn't work?**
- Wait 2-3 minutes for GitHub Pages to deploy
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check repository settings for GitHub Pages

**Viewer not seeing updates?**
- Check browser console for errors
- Ensure localStorage is enabled in browser
- Try refreshing the page

---

## Features

✅ **Admin Controls**
- Password-protected setup
- Add/remove/reorder games
- Manage players
- Enter results on the fly

✅ **Viewer Experience**
- No authentication needed
- Auto-refreshing leaderboard
- Real-time score updates
- Beautiful highscore display

✅ **Data Management**
- Persistent localStorage
- Score calculation
- Result tracking
- Last update timestamp

✅ **Responsive Design**
- Works on desktop, tablet, mobile
- Touch-friendly interface
- Auto-adapting layout

---

## Support

For issues or questions, check:
1. Browser console for errors (F12)
2. Network tab in DevTools
3. localStorage content (Application > Storage > Local Storage)

---

Enjoy your Game Olympiad! 🏆
