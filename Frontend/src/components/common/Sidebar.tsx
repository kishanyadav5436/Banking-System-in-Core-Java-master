import { NavLink } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineSwitchHorizontal,
  HiOutlineDocumentReport,
  HiOutlineLogout,
} from 'react-icons/hi';
import { RiBankLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'Overview', section: 'MAIN' },
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },

  { label: 'Management', section: 'MANAGEMENT' },
  { path: '/accounts', label: 'Accounts', icon: HiOutlineCreditCard },
  { path: '/customers', label: 'Customers', icon: HiOutlineUsers },
  { path: '/transactions', label: 'Transactions', icon: HiOutlineSwitchHorizontal },

  { label: 'Reports', section: 'REPORTS' },
  { path: '/reports', label: 'Reports', icon: HiOutlineDocumentReport },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <RiBankLine />
          </div>
          <div className="sidebar-brand-text">
            <h2>BankSystem</h2>
            <span>Pvt. Limited</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navLinks.map((item, i) => {
            if (item.section) {
              return (
                <div key={i} className="sidebar-section-label">
                  {item.section}
                </div>
              );
            }
            const Icon = item.icon!;
            return (
              <NavLink
                key={item.path}
                to={item.path!}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <span className="sidebar-link-icon"><Icon /></span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / User */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="sidebar-user-info">
              <h4>{user?.username || 'Admin'}</h4>
              <span>{user?.role || 'admin'}</span>
            </div>
            <button
              className="sidebar-logout-btn"
              onClick={logout}
              title="Logout"
            >
              <HiOutlineLogout size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
