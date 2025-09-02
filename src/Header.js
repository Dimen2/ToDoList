
import './Header.css';

export default function Header({ onSettingsClick, onLogOutClick }) {
  return (
    <header className="site-header">
      <div className="logo">
        <span className="green-logo">Code</span>Box
      </div>

      <nav className="nav-links">
        <button className="nav-button" onClick={onLogOutClick}>
          Log out
        </button>
        <button className="nav-button" onClick={onSettingsClick}>
          Settings
        </button>
      </nav>
    </header>
  );
}
