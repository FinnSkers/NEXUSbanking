import React, { useState, useEffect } from 'react';
import { Globe, ArrowRightLeft, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/currency.css';

const MultiCurrencyPage = () => {
  const [fxData, setFxData] = useState(null);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');
  const [amount, setAmount] = useState('100');
  const [isSwapping, setIsSwapping] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    api.getFX().then(setFxData);
  }, []);

  const rateKey = `${fromCurr}_${toCurr}`;
  const rate = fxData?.rates?.[rateKey] || (fromCurr === toCurr ? 1 : 0.92);
  const calculatedOutput = (parseFloat(amount || 0) * rate).toFixed(2);

  const handleSwapExecute = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      addToast('Please enter a valid amount to swap', 'error');
      return;
    }

    setIsSwapping(true);
    try {
      const res = await api.swapFX(fromCurr, toCurr, parseFloat(amount));
      setFxData(prev => ({ ...prev, balances: res.balances }));
      addToast(`Swapped ${fromCurr} ${amount} → ${toCurr} ${res.swappedAmount.toFixed(2)}`, 'success');
      setIsSwapping(false);
    } catch (err) {
      setIsSwapping(false);
      addToast(err.message || 'FX Swap failed', 'error');
    }
  };

  const balances = fxData?.balances || { USD: 48259.40, EUR: 12500.00, GBP: 8400.00, JPY: 450000.00 };

  return (
    <div className="currency-page">
      <div className="currency-header">
        <h1>Multi-Currency & FX Exchange</h1>
        <p>Hold multiple global currencies and exchange funds at real-time rates.</p>
      </div>

      <div className="currency-grid">
        <div className="currency-card">
          <div className="currency-flag">🇺🇸</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>US Dollar (USD)</div>
          <div className="currency-value">${balances.USD?.toLocaleString()}</div>
        </div>
        <div className="currency-card">
          <div className="currency-flag">🇪🇺</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Euro (EUR)</div>
          <div className="currency-value">€{balances.EUR?.toLocaleString()}</div>
        </div>
        <div className="currency-card">
          <div className="currency-flag">🇬🇧</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>British Pound (GBP)</div>
          <div className="currency-value">£{balances.GBP?.toLocaleString()}</div>
        </div>
        <div className="currency-card">
          <div className="currency-flag">🇯🇵</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Japanese Yen (JPY)</div>
          <div className="currency-value">¥{balances.JPY?.toLocaleString()}</div>
        </div>
      </div>

      <div className="swap-section">
        <div className="swap-card">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem' }}>Instant FX Converter</h3>
          
          <div className="swap-form-row">
            <div className="swap-input-group">
              <label>You Send</label>
              <select className="swap-select" value={fromCurr} onChange={e => setFromCurr(e.target.value)}>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
              <input 
                type="number" 
                className="swap-input" 
                style={{ marginTop: '0.5rem' }} 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
              />
            </div>

            <div style={{ padding: '1rem', color: 'var(--accent-violet)' }}>
              <ArrowRightLeft size={24} />
            </div>

            <div className="swap-input-group">
              <label>You Receive (Est.)</label>
              <select className="swap-select" value={toCurr} onChange={e => setToCurr(e.target.value)}>
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
              <input 
                type="text" 
                className="swap-input" 
                style={{ marginTop: '0.5rem', fontWeight: '700', color: 'var(--accent-teal)' }} 
                readOnly 
                value={`${calculatedOutput} ${toCurr}`} 
              />
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Exchange Rate: 1 {fromCurr} = {rate} {toCurr} · Zero Fee
          </div>

          <button className="swap-btn" onClick={handleSwapExecute} disabled={isSwapping}>
            {isSwapping ? 'Exchanging...' : 'Execute FX Swap'}
          </button>
        </div>

        <div className="rates-card">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '1rem' }}>Live FX Rates</h3>
          <div className="rate-item">
            <span>USD / EUR</span>
            <span style={{ fontWeight: '700' }}>0.9200</span>
            <span style={{ color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: '600' }}>+0.12%</span>
          </div>
          <div className="rate-item">
            <span>USD / GBP</span>
            <span style={{ fontWeight: '700' }}>0.7845</span>
            <span style={{ color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: '600' }}>+0.05%</span>
          </div>
          <div className="rate-item">
            <span>USD / JPY</span>
            <span style={{ fontWeight: '700' }}>155.20</span>
            <span style={{ color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: '600' }}>+0.45%</span>
          </div>
          <div className="rate-item">
            <span>EUR / USD</span>
            <span style={{ fontWeight: '700' }}>1.0870</span>
            <span style={{ color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: '600' }}>+0.08%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCurrencyPage;
