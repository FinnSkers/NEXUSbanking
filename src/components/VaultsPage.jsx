import React, { useState, useEffect } from 'react';
import { Plus, ShieldCheck, Plane, Laptop, PiggyBank, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/vaults.css';

const iconMap = { ShieldCheck, Plane, Laptop, PiggyBank };

const VaultsPage = () => {
  const [vaults, setVaults] = useState([]);
  const [autoRoundup, setAutoRoundup] = useState(true);
  const [depositModalVault, setDepositModalVault] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    api.getVaults().then(setVaults);
  }, []);

  const totalSaved = vaults.reduce((acc, v) => acc + v.saved, 0);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      addToast('Please enter a valid deposit amount', 'error');
      return;
    }

    try {
      const amount = parseFloat(depositAmount);
      await api.depositVault(depositModalVault.id, amount);
      const updatedVaults = await api.getVaults();
      setVaults(updatedVaults);
      addToast(`Deposited $${amount} into ${depositModalVault.name}!`, 'success');
      setDepositModalVault(null);
      setDepositAmount('');
    } catch (err) {
      addToast(err.message || 'Deposit failed', 'error');
    }
  };

  const handleToggleRoundup = () => {
    const nextState = !autoRoundup;
    setAutoRoundup(nextState);
    addToast(nextState ? 'Auto-roundup enabled for card purchases' : 'Auto-roundup disabled', nextState ? 'success' : 'info');
  };

  return (
    <div className="vaults-page">
      <div className="vaults-header">
        <h1>Savings Vaults</h1>
        <p>Set money aside for your goals with automated roundups.</p>
      </div>

      <div className="vaults-summary">
        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Vault Savings</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--accent-teal)', margin: '0.5rem 0' }}>
            ${totalSaved.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Across {vaults.length} active goals</div>
        </div>

        <div className="summary-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>Auto-Roundup</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Save spare change on card buys</div>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={autoRoundup} onChange={handleToggleRoundup} />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-violet)', fontWeight: '600', marginTop: '1rem' }}>
            +$42.50 saved this week
          </div>
        </div>

        <div className="summary-card" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>Start New Goal</div>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
            Set a target and lock funds to build your wealth faster.
          </p>
          <button 
            className="deposit-btn" 
            style={{ background: 'white', color: 'var(--text-primary)', border: 'none', fontWeight: '700' }}
            onClick={() => addToast('New Vault Creator opened!', 'info')}
          >
            + Create New Vault
          </button>
        </div>
      </div>

      <div className="vaults-grid">
        {vaults.map((vault) => {
          const Icon = iconMap[vault.icon] || PiggyBank;
          const percentage = Math.min(100, Math.round((vault.saved / vault.target) * 100));

          return (
            <div key={vault.id} className="vault-card">
              <div>
                <div className="vault-icon-row">
                  <div className="vault-icon" style={{ backgroundColor: vault.color }}>
                    <Icon size={24} />
                  </div>
                  <span className="vault-category">{vault.category}</span>
                </div>

                <div className="vault-name">{vault.name}</div>
                
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${percentage}%`, backgroundColor: vault.color }}
                  ></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', margin: '0.5rem 0' }}>
                  <span style={{ fontWeight: '700' }}>${vault.saved.toLocaleString()}</span>
                  <span style={{ color: 'var(--text-tertiary)' }}>Target: ${vault.target.toLocaleString()} ({percentage}%)</span>
                </div>
              </div>

              <button className="deposit-btn" onClick={() => setDepositModalVault(vault)}>
                + Deposit Money
              </button>
            </div>
          );
        })}
      </div>

      {depositModalVault && (
        <div className="modal-backdrop" onClick={() => setDepositModalVault(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Deposit into {depositModalVault.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem 0' }}>
              Transfer funds from main balance into this goal vault.
            </p>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <input 
                type="number" 
                className="swap-input" 
                placeholder="0.00" 
                value={depositAmount} 
                onChange={e => setDepositAmount(e.target.value)}
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-base)' }}
              />
            </div>
            <button className="swap-btn" onClick={handleDeposit}>Confirm Deposit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultsPage;
