import React, { useState, useEffect } from 'react';
import { Gauge, ShieldCheck, Sparkles, CheckCircle2, DollarSign } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/credit.css';

const CreditPage = () => {
  const [credit, setCredit] = useState(null);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [isApplying, setIsApplying] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    api.getCredit().then(setCredit);
  }, []);

  const handleApplyLoan = async () => {
    setIsApplying(true);
    try {
      await api.applyLoan(loanAmount);
      addToast(`Pre-approved Loan of $${loanAmount.toLocaleString()} credited to your balance!`, 'success');
      setIsApplying(false);
    } catch (err) {
      setIsApplying(false);
      addToast('Loan application failed', 'error');
    }
  };

  const monthlyEst = Math.round((loanAmount * (1 + 0.049)) / 24);

  return (
    <div className="credit-page">
      <div className="credit-header">
        <h1>Credit Score & Pre-Approved Loans</h1>
        <p>Monitor your financial rating and activate instant credit lines.</p>
      </div>

      <div className="credit-hero">
        <div className="score-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>FICO® Credit Score</div>
          <div className="score-circle">
            <div className="score-num">{credit?.score || 785}</div>
            <div className="score-rating">{credit?.rating || 'Excellent'}</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Updated today · Top 10% nationwide</div>
        </div>

        <div className="loan-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles color="var(--accent-amber)" size={20} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>Instant Loan Pre-Approval</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Based on your Excellent 785 rating, you qualify for up to $15,000 credit at 4.9% fixed APR.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyBetween: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>Select Amount</span>
              <span style={{ fontWeight: '700', color: 'var(--accent-violet)' }}>${loanAmount.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="15000" 
              step="500"
              value={loanAmount}
              onChange={e => setLoanAmount(parseInt(e.target.value))}
              className="limit-slider"
            />
          </div>

          <div style={{ background: 'var(--bg-base)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', margin: '1rem 0', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Est. Monthly Payment (24 mos)</span>
            <span style={{ fontWeight: '700' }}>${monthlyEst}/mo</span>
          </div>

          <button className="swap-btn" onClick={handleApplyLoan} disabled={isApplying}>
            {isApplying ? 'Processing Credit...' : `Accept & Deposit $${loanAmount.toLocaleString()}`}
          </button>
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '1rem' }}>Credit Score Factors</h3>
      <div className="factors-grid">
        {(credit?.factors || [
          { name: 'Payment History', status: '100% On-time', score: 'Excellent' },
          { name: 'Credit Utilization', status: '14% Used', score: 'Good' },
          { name: 'Credit Age', status: '4.2 Years', score: 'Fair' },
          { name: 'Total Accounts', status: '6 Active', score: 'Good' },
        ]).map((f, i) => (
          <div key={i} className="factor-card">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{f.name}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', margin: '0.25rem 0' }}>{f.status}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: '600' }}>{f.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditPage;
