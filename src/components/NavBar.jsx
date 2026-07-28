import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  CreditCard, 
  UserCircle, 
  Sun, 
  Moon 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../styles/navbar.css';

const NavBar = ({ activeTab, onTabChange }) => {
  const { isDark, toggleTheme } = useTheme();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'transfers', label: 'Transfers', icon: ArrowLeftRight },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <nav className="navbar">
      <div className="nav-tabs">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              style={{ animationDelay: `${index * 0.04}s` }}
              title={tab.label}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}

        <button className="nav-theme-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode" style={{ marginLeft: '0.4rem' }}>
          {isDark ? <Sun size={16} color="var(--accent-amber)" /> : <Moon size={16} color="var(--accent-violet)" />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
