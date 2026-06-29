import React, { useState } from 'react';
import Button from './Button';
import './AdminLogin.css';

const AdminLogin = ({ onAdminLogin, onContinueAsViewer }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = () => {
    // Default admin password: 'swordfish'
    const correctPassword = 'swordfish';
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
          <h1>🎮 ZRS Meisterschaft</h1>
          <p>Wähle deinen Modus zum Fortfahren</p>
        </div>

        <div className="login-options">
          <div className="login-card">
            <div className="card-icon">👑</div>
            <h2>Spielleiter-Modus</h2>
            <p>Erstelle Spiele, verwalte Spieler und zeige Ergebnisse an</p>
            
            <div className="password-input-group">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Passwort eingeben"
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
              label="Als Spielleiter anmelden" 
              onClick={handleAdminLogin}
              variant="success"
            />
          </div>

          <div className="divider">ODER</div>

          <div className="login-card viewer">
            <div className="card-icon">👀</div>
            <h2>Zuschauer-Modus</h2>
            <p>Beobachte Spiele und sehe Live-Ergebnisse und Bestenlisten</p>
            
            <Button 
              label="Als Zuschauer fortfahren" 
              onClick={onContinueAsViewer}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
