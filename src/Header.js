import './Header.css';

export default function Header({ onSettingsClick }) {
  return (
    <header className="site-header">
      <div className="logo">
        <span className="green-logo">Code</span>Box
      </div>
      <nav className="nav-links">
        <button className="nav-button">Log in</button>
        <button className="nav-button" onClick={onSettingsClick}>
          Settings
        </button>
      </nav>
    </header>
  );
}
