import React from 'react';
import { 
  LayoutDashboard, 
  PiggyBank, 
  Globe, 
  Calendar, 
  Gauge, 
  TrendingUp, 
  Receipt, 
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
    { id: 'vaults', label: 'Vaults', icon: PiggyBank },
    { id: 'fx', label: 'FX Swap', icon: Globe },
    { id: 'bills', label: 'Bills', icon: Calendar },
    { id: 'credit', label: 'Credit', icon: Gauge },
    { id: 'invest', label: 'Invest', icon: TrendingUp },
    { id: 'transactions', label: 'History', icon: Receipt },
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
              style={{ animationDelay: `${index * 0.03}s` }}
              title={tab.label}
            >
              <Icon size={17} />
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
