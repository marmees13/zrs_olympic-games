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
      alert('Incorrect password!');
      setAdminPassword('');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>🎮 Game Olympiad</h1>
          <p>Choose your mode to continue</p>
        </div>

        <div className="login-options">
          <div className="login-card">
            <div className="card-icon">👑</div>
            <h2>Admin Mode</h2>
            <p>Create games, manage players, and view results</p>
            
            <div className="password-input-group">
              <label>Admin Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
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
              label="Login as Admin" 
              onClick={handleAdminLogin}
              variant="success"
            />
            <p className="hint">💡 Default password: <code>admin123</code></p>
          </div>

          <div className="divider">OR</div>

          <div className="login-card viewer">
            <div className="card-icon">👀</div>
            <h2>Viewer Mode</h2>
            <p>Watch games and see live results & highscores</p>
            
            <Button 
              label="Continue as Viewer" 
              onClick={onContinueAsViewer}
              variant="primary"
            />
            <p className="hint">🔄 Auto-updates every 2 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
