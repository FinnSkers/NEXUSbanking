import React, { useState, useEffect } from 'react';
import { Calendar, Zap, CheckCircle2, AlertCircle, Clock, Check } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/bills.css';

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [payingId, setPayingId] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    api.getBills().then(setBills);
  }, []);

  const totalMonthly = bills.reduce((acc, b) => acc + b.amount, 0);
  const unpaidCount = bills.filter(b => !b.isPaid).length;
  const paidTotal = bills.filter(b => b.isPaid).reduce((acc, b) => acc + b.amount, 0);

  const handlePay = async (bill) => {
    setPayingId(bill.id);
    try {
      await api.payBill(bill.id);
      const updatedBills = await api.getBills();
      setBills(updatedBills);
      addToast(`Paid $${bill.amount.toFixed(2)} to ${bill.name}`, 'success');
      setPayingId(null);
    } catch (err) {
      setPayingId(null);
      addToast(err.message || 'Payment failed', 'error');
    }
  };

  return (
    <div className="bills-page">
      <div className="bills-header">
        <h1>Subscriptions & Bill Pay</h1>
        <p>Manage recurring bills and pay due invoices with 1-click.</p>
      </div>

      <div className="bills-summary">
        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Monthly Bills</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', margin: '0.25rem 0' }}>
            ${totalMonthly.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{bills.length} active subscriptions</div>
        </div>

        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Unpaid / Due Soon</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent-coral)', margin: '0.25rem 0' }}>
            {unpaidCount} Bills
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-coral)' }}>Requires attention</div>
        </div>

        <div className="summary-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Paid This Month</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent-teal)', margin: '0.25rem 0' }}>
            ${paidTotal.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>Auto-pay active</div>
        </div>
      </div>

      <div className="bills-list">
        {bills.map((bill) => (
          <div key={bill.id} className="bill-row">
            <div className="bill-icon" style={{ backgroundColor: bill.color }}>
              <Zap size={20} />
            </div>

            <div className="bill-info">
              <div className="bill-name">{bill.name}</div>
              <div className="bill-provider">{bill.provider} · {bill.category}</div>
            </div>

            <div className="bill-due">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
                <Calendar size={14} color="var(--text-tertiary)" />
                <span>Due: {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>

            <div className="bill-amount">
              ${bill.amount.toFixed(2)}
            </div>

            <div>
              {bill.isPaid ? (
                <button className="pay-btn paid" disabled>
                  <Check size={14} /> Paid
                </button>
              ) : (
                <button 
                  className="pay-btn" 
                  onClick={() => handlePay(bill)}
                  disabled={payingId === bill.id}
                >
                  {payingId === bill.id ? 'Processing...' : 'Pay Bill'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsPage;
