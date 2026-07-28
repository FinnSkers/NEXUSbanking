import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/invest.css';

const InvestPage = () => {
  const [investments, setInvestments] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    api.getInvestments().then(setInvestments);
  }, []);

  const totalPortfolio = investments.reduce((acc, i) => acc + i.value, 0);

  const handleTrade = (asset) => {
    addToast(`Trade interface opened for ${asset.name} (${asset.symbol})`, 'info');
  };

  return (
    <div className="invest-page">
      <div className="invest-header">
        <h1>Investments & Crypto</h1>
        <p>Track your stocks and cryptocurrency portfolio in real time.</p>
      </div>

      <div className="invest-summary">
        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Portfolio Value</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', margin: '0.25rem 0' }}>
            ${totalPortfolio.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>+$540.00 (24h)</div>
        </div>

        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Asset Allocation</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', margin: '0.25rem 0' }}>
            55% Stocks / 45% Crypto
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Diversified Risk</div>
        </div>

        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Profit</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent-teal)', margin: '0.25rem 0' }}>
            +$2,480.00
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>+18.4% All-time return</div>
        </div>
      </div>

      <div className="invest-table">
        {investments.map((asset) => {
          const isPositive = asset.change > 0;
          return (
            <div key={asset.symbol} className="invest-row">
              <div className="asset-info">
                <div className="asset-symbol">{asset.symbol}</div>
                <div className="asset-name">{asset.name} · {asset.type}</div>
              </div>

              <div className="asset-price">
                ${asset.price.toLocaleString()}
              </div>

              <div className={`asset-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '+' : ''}{asset.change}%
              </div>

              <div style={{ marginRight: '1.5rem', textAlign: 'right' }}>
                <div style={{ fontWeight: '700' }}>${asset.value.toLocaleString()}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{asset.shares} {asset.symbol}</div>
              </div>

              <button className="pay-btn" onClick={() => handleTrade(asset)}>
                Trade
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestPage;
