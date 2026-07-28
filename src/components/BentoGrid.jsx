import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, QrCode } from 'lucide-react';
import BalanceCard from './BalanceCard';
import SparklineCard from './SparklineCard';
import ArcCard from './ArcCard';
import TransactionsList from './TransactionsList';
import QuickSend from './QuickSend';
import AICopilot from './AICopilot';
import BudgetingAnalytics from './BudgetingAnalytics';
import QRPayModal from './QRPayModal';
import { api } from '../services/api';
import '../styles/bento.css';

const BentoGrid = () => {
  const [overview, setOverview] = useState(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    api.getOverview().then(setOverview);
  }, []);

  return (
    <div>
      {/* Quick QR Pay Action Banner */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          onClick={() => setShowQR(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--gradient-primary)',
            color: 'white',
            fontWeight: '700',
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.35)',
            transition: 'all var(--transition-fast)'
          }}
        >
          <QrCode size={18} /> QR Pay & Scan
        </button>
      </div>

      <div className="bento-grid">
        <BalanceCard balance={overview?.balance} />
        <SparklineCard />
        <ArcCard 
          title="Income" 
          value={overview?.income || 5700} 
          total={8000} 
          color="var(--accent-teal)" 
          icon={TrendingUp} 
          delay={0.2} 
        />
        <ArcCard 
          title="Expenses" 
          value={overview?.expenses || 3210} 
          total={5000} 
          color="var(--accent-coral)" 
          icon={TrendingDown} 
          delay={0.3} 
        />
        
        {/* AI Financial Copilot */}
        <div className="bento-card bento-wide">
          <AICopilot />
        </div>

        {/* Budget Analytics */}
        <div className="bento-card bento-wide">
          <BudgetingAnalytics />
        </div>

        <TransactionsList transactions={overview?.recentTransactions} />
        <QuickSend />
      </div>

      <QRPayModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </div>
  );
};

export default BentoGrid;
