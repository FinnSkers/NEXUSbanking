import React from 'react';
import { LayoutDashboard, Receipt, ArrowLeftRight, CreditCard, UserCircle, Hexagon, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../styles/navbar.css';

const NavBar = ({ activeTab, onTabChange }) => {
  const { isDark, toggleTheme } = useTheme();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'History', icon: Receipt },
    { id: 'transfers', label: 'Transfers', icon: ArrowLeftRight },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-side navbar-left">
        <Hexagon size={22} className="logo-icon" color="var(--accent-violet)" />
        <span className="logo-text">
          <span style={{ color: 'var(--accent-violet)' }}>N</span>EXUS
        </span>
      </div>

      <div className="nav-tabs">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Icon size={17} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="navbar-side navbar-right">
        <button className="nav-theme-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
          {isDark ? <Sun size={17} color="var(--accent-amber)" /> : <Moon size={17} color="var(--accent-violet)" />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
