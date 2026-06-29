# React Webpack App

A simple and clean React project with Webpack configuration for local development.

## Features

- ⚛️ React 18
- 📦 Webpack 5 bundler
- 🔥 Hot Module Reloading (HMR)
- 🎨 CSS support
- 📱 Responsive components

## Available Components

- **Button** - A reusable button component with click handling
- **Card** - A card component for organizing content
- **Counter** - A stateful counter component demonstrating React hooks
- **Hero** - A hero banner component

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

The app will open automatically at `http://localhost:8080`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Counter.jsx
│   │   └── Hero.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── webpack.config.js
├── .babelrc
└── package.json
```

## Scripts

- `npm start` - Start development server
- `npm run dev` - Run dev server without auto-open
- `npm run build` - Build for production

## License

ISC
