import './Header.css';
import { useState } from 'react';

export default function Header({ username, onTabChange, onLogOutClick, onLogoClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="site-header">
      <div className="header-row">
        <div className="logo" onClick={onLogoClick}>
          <span className="green-logo">Code</span>Box
        </div>

        <div className="user-section">
          <button className="user-button" onClick={toggleMenu}>
            <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
            <span className="user-name">@{username}</span>
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => onTabChange('profile')}>Profile</button>
              <button className="dropdown-item" onClick={() => onTabChange('settings')}>Settings</button>
              <button className="dropdown-item" onClick={() => onTabChange('leaders')}>Leaders</button>
              <button className="dropdown-item" onClick={() => onTabChange('contacts')}>Contacts</button>
              <button className="dropdown-item logout" onClick={onLogOutClick}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
