import React, { useState } from 'react';
import { PiggyBank, Globe, Ghost, Calendar, Gauge, TrendingUp } from 'lucide-react';
import VaultsPage from './VaultsPage';
import MultiCurrencyPage from './MultiCurrencyPage';
import VirtualCards from './VirtualCards';
import BillsPage from './BillsPage';
import CreditPage from './CreditPage';
import InvestPage from './InvestPage';

const FinanceHub = () => {
  const [subTab, setSubTab] = useState('vaults');

  const subTabs = [
    { id: 'vaults', label: 'Vaults', icon: PiggyBank },
    { id: 'fx', label: 'FX Swap', icon: Globe },
    { id: 'ghost', label: 'Ghost Cards', icon: Ghost },
    { id: 'bills', label: 'Bills', icon: Calendar },
    { id: 'credit', label: 'Credit & Loans', icon: Gauge },
    { id: 'invest', label: 'Invest & Crypto', icon: TrendingUp },
  ];

  return (
    <div>
      {/* Sub-tab segmented pill bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{
          display: 'inline-flex',
          gap: '0.3rem',
          background: 'var(--bg-card)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {subTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render selected financial tool */}
      {subTab === 'vaults' && <VaultsPage />}
      {subTab === 'fx' && <MultiCurrencyPage />}
      {subTab === 'ghost' && <VirtualCards />}
      {subTab === 'bills' && <BillsPage />}
      {subTab === 'credit' && <CreditPage />}
      {subTab === 'invest' && <InvestPage />}
    </div>
  );
};

export default FinanceHub;
