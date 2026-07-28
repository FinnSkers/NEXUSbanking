import React from 'react';
import ReactDOM from 'react-dom';
import { X, Copy, Download, CheckCircle, ShoppingBag, Briefcase, Music, ArrowUpRight, DollarSign, Dumbbell, Monitor, Zap, Coffee, ArrowDownLeft, Car, TrendingUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../styles/modal.css';

const iconMap = {
  ShoppingBag, Briefcase, Music, ArrowUpRight, DollarSign, Dumbbell, Monitor, Zap, Coffee, ArrowDownLeft, Car, TrendingUp
};

const TransactionModal = ({ transaction, onClose }) => {
  const { addToast } = useToast();
  if (!transaction) return null;

  const Icon = (typeof transaction.icon === 'function' || typeof transaction.icon === 'object')
    ? transaction.icon
    : (iconMap[transaction.icon] || ArrowUpRight);

  const isPositive = transaction.amount > 0;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.ref || 'NEX-892301');
    addToast('Reference ID copied to clipboard!', 'info');
  };

  const handleDownloadReceipt = () => {
    addToast(`Receipt for ${transaction.name} downloaded!`, 'success');
  };

  const modalUI = (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="receipt-header">
          <div className="receipt-icon" style={{ backgroundColor: transaction.color || 'var(--accent-violet)' }}>
            <Icon size={24} color="white" />
          </div>
          <h3 className="receipt-name">{transaction.name}</h3>
          <div className="receipt-date">{transaction.date}</div>
          <div className={`receipt-amount ${isPositive ? 'positive' : ''}`}>
            {isPositive ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
          </div>
          <div className="receipt-badge">
            <CheckCircle size={14} color="var(--accent-teal)" />
            <span>Completed</span>
          </div>
        </div>

        <div className="receipt-details">
          <div className="receipt-row">
            <span className="receipt-label">Category</span>
            <span className="receipt-value">{transaction.category}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Reference ID</span>
            <div className="receipt-value ref-code" onClick={handleCopyRef} title="Click to copy">
              <span>{transaction.ref || 'NEX-892301'}</span>
              <Copy size={14} color="var(--accent-violet)" />
            </div>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Payment Method</span>
            <span className="receipt-value">NEXUS Card **** 4281</span>
          </div>
          {transaction.note && (
            <div className="receipt-row">
              <span className="receipt-label">Note</span>
              <span className="receipt-value">{transaction.note}</span>
            </div>
          )}
        </div>

        <div className="receipt-actions">
          <button className="receipt-btn" onClick={handleDownloadReceipt}>
            <Download size={16} /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalUI, document.body);
};

export default TransactionModal;
