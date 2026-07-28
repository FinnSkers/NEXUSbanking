import React from 'react';
import { Send, Download, TrendingUp } from 'lucide-react';
import '../styles/bento.css';

const BalanceCard = ({ balance = 48259.40, className = '' }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(balance);

  return (
    <div className={`bento-card balance-card ${className}`} style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) both' }}>
      <div className="mesh-bg"></div>
      <div className="balance-content">
        <div style={{ fontSize: '0.875rem', opacity: 0.9, letterSpacing: '0.02em' }}>Total Balance</div>
        <div className="balance-amount">
          {formattedBalance}
        </div>
        
        <div className="balance-pill">
          <TrendingUp size={14} color="#4ade80" />
          <span style={{ color: '#4ade80', fontWeight: '700' }}>+$2,540.00</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>this month</span>
        </div>
        
        <div className="balance-actions">
          <button className="balance-btn">
            <Send size={16} /> Send
          </button>
          <button className="balance-btn">
            <Download size={16} /> Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
