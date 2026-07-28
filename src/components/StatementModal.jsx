import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, X, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/statement.css';

const StatementModal = ({ isOpen, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('July 2024');
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      api.getTransactions().then(setTransactions);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    api.exportCSV(transactions);
    addToast('Account Statement CSV downloaded!', 'success');
  };

  return (
    <div className="statement-modal-backdrop" onClick={onClose}>
      <div className="statement-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="var(--accent-violet)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>Account Statement</h3>
          </div>

          <select 
            value={selectedMonth} 
            onChange={e => setSelectedMonth(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-base)' }}
          >
            <option value="July 2024">July 2024</option>
            <option value="June 2024">June 2024</option>
            <option value="May 2024">May 2024</option>
          </select>
        </div>

        {/* Printable Paper Document */}
        <div className="statement-paper">
          <div className="statement-header">
            <div>
              <img src="/logo.png" alt="NEXUS Logo" style={{ height: 32, marginBottom: '0.25rem' }} />
              <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>NEXUS Financial Bank N.A. · Member FDIC</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>OFFICIAL STATEMENT</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Period: {selectedMonth}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <div>
              <div style={{ fontWeight: '700', color: '#111827' }}>Account Holder</div>
              <div>Alex Doe</div>
              <div style={{ color: '#6b7280' }}>123 Financial District Way</div>
              <div style={{ color: '#6b7280' }}>New York, NY 10005</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700', color: '#111827' }}>Account Summary</div>
              <div>Account #: **** 4281</div>
              <div>Type: Premium Checking</div>
            </div>
          </div>

          <div className="statement-summary-box">
            <div>
              <div className="box-label">Beginning Balance</div>
              <div className="box-val">$42,100.00</div>
            </div>
            <div>
              <div className="box-label">Total Deposits</div>
              <div className="box-val" style={{ color: '#059669' }}>+$8,840.00</div>
            </div>
            <div>
              <div className="box-label">Total Withdrawals</div>
              <div className="box-val" style={{ color: '#dc2626' }}>-$2,680.60</div>
            </div>
            <div>
              <div className="box-label">Ending Balance</div>
              <div className="box-val" style={{ fontWeight: '700' }}>$48,259.40</div>
            </div>
          </div>

          <table className="statement-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 8).map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td style={{ fontWeight: '600' }}>{tx.name}</td>
                  <td>{tx.category}</td>
                  <td style={{ textAlign: 'right', fontWeight: '700', color: tx.amount > 0 ? '#059669' : '#111827' }}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
            NEXUS Banking Corporation · Page 1 of 1 · Equal Housing Lender
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="statement-btn print" onClick={handlePrint}>
            <Printer size={16} /> Print / Save as PDF
          </button>
          <button className="statement-btn csv" onClick={handleDownloadCSV}>
            <Download size={16} /> Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatementModal;
