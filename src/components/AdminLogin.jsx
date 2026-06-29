import React, { useState } from 'react';
import Button from './Button';
import './AdminLogin.css';

const AdminLogin = ({ onAdminLogin, onContinueAsViewer }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = () => {
    // Default admin password: 'admin123'
    const correctPassword = 'admin123';
    if (adminPassword === correctPassword) {
      onAdminLogin();
    } else {
      alert('Falsches Passwort!');
      setAdminPassword('');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>🎮 Spiel Olympiad</h1>
          <p>Wählen Sie Ihren Modus zum Fortfahren</p>
        </div>

        <div className="login-options">
          <div className="login-card">
            <div className="card-icon">👑</div>
            <h2>Admin-Modus</h2>
            <p>Erstellen Sie Spiele, verwalten Sie Spieler und zeigen Sie Ergebnisse an</p>
            
            <div className="password-input-group">
              <label>Admin-Passwort</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Admin-Passwort eingeben"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <Button 
              label="Als Admin anmelden" 
              onClick={handleAdminLogin}
              variant="success"
            />
          </div>

          <div className="divider">ODER</div>

          <div className="login-card viewer">
            <div className="card-icon">👀</div>
            <h2>Zuschauer-Modus</h2>
            <p>Beobachten Sie Spiele und sehen Sie Live-Ergebnisse und Bestenlisten</p>
            
            <Button 
              label="Als Zuschauer fortfahren" 
              onClick={onContinueAsViewer}
              variant="primary"
            />
            <p className="hint">🔄 Automatische Aktualisierung alle 2 Sekunden</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
