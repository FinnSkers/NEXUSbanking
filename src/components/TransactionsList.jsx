import React, { useState } from 'react';
import { ShoppingBag, Briefcase, Music, ArrowUpRight, DollarSign, Dumbbell, Monitor, Zap, Coffee, ArrowDownLeft, Car, TrendingUp } from 'lucide-react';
import TransactionModal from './TransactionModal';
import '../styles/bento.css';

const iconMap = {
  ShoppingBag, Briefcase, Music, ArrowUpRight, DollarSign, Dumbbell, Monitor, Zap, Coffee, ArrowDownLeft, Car, TrendingUp
};

const DEFAULT_TXS = [
  { id: '1', name: 'Apple Store', category: 'Shopping', date: 'Today', amount: -299.00, color: '#1a1a2e', icon: 'ShoppingBag' },
  { id: '2', name: 'Salary Deposit', category: 'Income', date: 'Yesterday', amount: 4500.00, color: '#14b8a6', icon: 'Briefcase' },
  { id: '3', name: 'Spotify', category: 'Entertainment', date: 'Jul 25', amount: -9.99, color: '#8b5cf6', icon: 'Music' },
  { id: '4', name: 'Transfer to Jane', category: 'Transfers', date: 'Jul 24', amount: -250.00, color: '#6366f1', icon: 'ArrowUpRight' },
  { id: '5', name: 'Freelance Payment', category: 'Income', date: 'Jul 23', amount: 1200.00, color: '#f59e0b', icon: 'DollarSign' },
];

const TransactionsList = ({ transactions }) => {
  const [selectedTx, setSelectedTx] = useState(null);
  const txList = transactions || DEFAULT_TXS;

  return (
    <div className="bento-card bento-wide" style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) 0.3s both' }}>
      <div className="card-header">
        <div className="card-title">Recent Transactions</div>
        <span className="card-link" style={{ cursor: 'pointer' }}>Real-time sync</span>
      </div>
      
      <div className="tx-list">
        {txList.map((tx, index) => {
          const Icon = iconMap[tx.icon] || ShoppingBag;
          const isPositive = tx.amount > 0;
          return (
            <div 
              key={tx.id || index} 
              className="tx-item"
              style={{ animation: `slideIn 0.4s var(--ease-out-expo) ${0.4 + index * 0.1}s both`, cursor: 'pointer' }}
              onClick={() => setSelectedTx(tx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div className="tx-icon" style={{ backgroundColor: tx.color || '#8b5cf6' }}>
                  <Icon size={18} />
                </div>
                <div className="tx-info">
                  <div className="tx-name">{tx.name}</div>
                  <div className="tx-date">{tx.date}</div>
                </div>
              </div>
              <div className={`tx-amount ${isPositive ? 'positive' : ''}`}>
                {isPositive ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTx && (
        <TransactionModal 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </div>
  );
};

export default TransactionsList;
