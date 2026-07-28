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
        {/* Row 1: Balance (7 cols) + 7-Day Trend (5 cols) */}
        <BalanceCard className="col-span-7" balance={overview?.balance} />
        <SparklineCard className="col-span-5" />

        {/* Row 2: Income Arc (6 cols) + Expenses Arc (6 cols) */}
        <ArcCard 
          className="col-span-6"
          title="Income" 
          value={overview?.income || 5700} 
          total={8000} 
          color="var(--accent-teal)" 
          icon={TrendingUp} 
          delay={0.2} 
        />
        <ArcCard 
          className="col-span-6"
          title="Expenses" 
          value={overview?.expenses || 3210} 
          total={5000} 
          color="var(--accent-coral)" 
          icon={TrendingDown} 
          delay={0.3} 
        />
        
        {/* Row 3: AI Copilot (7 cols) + Budget Analytics (5 cols) */}
        <AICopilot className="col-span-7" />
        <BudgetingAnalytics className="col-span-5" />

        {/* Row 4: Recent Transactions (7 cols) + Quick Send (5 cols) */}
        <TransactionsList className="col-span-7" transactions={overview?.recentTransactions} />
        <QuickSend className="col-span-5" />
      </div>

      <QRPayModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </div>
  );
};

export default BentoGrid;
