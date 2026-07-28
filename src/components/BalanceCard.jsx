import React from 'react';
import { Send, Download, TrendingUp } from 'lucide-react';
import '../styles/bento.css';

const BalanceCard = ({ balance = 48259.40 }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(balance);

  return (
    <div className="bento-card bento-large balance-card" style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) both' }}>
      <div className="mesh-bg"></div>
      <div className="balance-content">
        <div style={{ fontSize: '0.875rem', opacity: 0.9, letterSpacing: '0.02em' }}>Total Balance</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0 0.75rem 0', lineHeight: 1 }}>
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
