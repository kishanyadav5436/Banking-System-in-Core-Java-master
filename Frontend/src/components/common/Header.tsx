import { HiOutlineSearch, HiOutlineBell, HiOutlineMenu } from 'react-icons/hi';
import './Header.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="app-header" id="app-header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuToggle} title="Menu">
          <HiOutlineMenu size={22} />
        </button>
        <div className="header-search">
          <HiOutlineSearch className="header-search-icon" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search accounts, customers…"
            id="header-search"
          />
        </div>
      </div>

      <div className="header-right">
        <span className="header-date">{today}</span>
        <button className="header-notification-btn" title="Notifications" id="header-notifications">
          <HiOutlineBell size={20} />
          <span className="header-notification-dot" />
        </button>
      </div>
    </header>
  );
}
