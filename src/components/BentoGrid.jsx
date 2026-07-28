import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import BalanceCard from './BalanceCard';
import SparklineCard from './SparklineCard';
import ArcCard from './ArcCard';
import TransactionsList from './TransactionsList';
import QuickSend from './QuickSend';
import { api } from '../services/api';
import '../styles/bento.css';

const BentoGrid = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    api.getOverview().then(setOverview);
  }, []);

  return (
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
      <TransactionsList transactions={overview?.recentTransactions} />
      <QuickSend />
    </div>
  );
};

export default BentoGrid;
