import './Header.css';
import { useState } from 'react';

export default function Header({ username, onSettingsClick, onLogOutClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="site-header">
  <div className="header-row">
    <div className="logo">
      <span className="green-logo">Code</span>Box
    </div>

    <div className="user-section">
      <button className="user-button" onClick={toggleMenu}>
        <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
        <span className="user-name">@{username}</span>
      </button>

      {menuOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item">Profile</button>
          <button className="dropdown-item" onClick={onSettingsClick}>Settings</button>
          <button className="dropdown-item">Subscription</button>
          <button className="dropdown-item">Contact</button>
          <button className="dropdown-item logout" onClick={onLogOutClick}>Logout</button>
        </div>
      )}
    </div>
  </div>
</header>


  );
}



{/* <nav className="nav-links">
        <button className="nav-button" onClick={onLogOutClick}>
          Log out
        </button>
        <button className="nav-button" onClick={onSettingsClick}>
          Settings
        </button>
      </nav> */}