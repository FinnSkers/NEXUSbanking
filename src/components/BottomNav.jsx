import React from 'react';
import { LayoutDashboard, Receipt, ArrowLeftRight, CreditCard, UserCircle } from 'lucide-react';
import '../styles/bottomnav.css';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'transactions', icon: Receipt, label: 'Transactions' },
    { id: 'transfers', icon: ArrowLeftRight, label: 'Transfers' },
    { id: 'cards', icon: CreditCard, label: 'Cards' },
    { id: 'profile', icon: UserCircle, label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            className={`bottom-nav-tab ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange(tab.id)}
          >
            <Icon size={24} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
