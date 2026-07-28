import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import '../styles/transfers.css';

const contacts = [
  {name:'Jane', initials:'JD', gradient:'linear-gradient(135deg,#ff6b6b,#ee5a24)'},
  {name:'Mike', initials:'MS', gradient:'linear-gradient(135deg,#8b5cf6,#6366f1)'},
  {name:'Sarah', initials:'SK', gradient:'linear-gradient(135deg,#14b8a6,#06b6d4)'},
  {name:'Tom', initials:'TW', gradient:'linear-gradient(135deg,#f59e0b,#ef4444)'},
  {name:'Lisa', initials:'LR', gradient:'linear-gradient(135deg,#ec4899,#8b5cf6)'}
];

const TransferView = () => {
  const [amount, setAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState(0);
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { addToast } = useToast();

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      addToast('Please enter a valid transfer amount.', 'error');
      return;
    }

    setIsSending(true);
    const recipientName = contacts[selectedContact].name;

    try {
      await api.createTransaction({
        name: `Transfer to ${recipientName}`,
        amount: parseFloat(amount),
        recipient: recipientName,
        note: note,
        category: 'Transfers'
      });

      setIsSending(false);
      setIsSuccess(true);
      addToast(`$${amount} transferred to ${recipientName}!`, 'success');

      setTimeout(() => {
        setIsSuccess(false);
        setAmount('');
        setNote('');
      }, 3000);
    } catch (err) {
      setIsSending(false);
      addToast('Failed to process transfer. Try again.', 'error');
    }
  };

  return (
    <div className="transfer-view">
      <h2 className="transfer-title">Send Money</h2>
      
      <div className="amount-display">
        <span className="amount-prefix">$</span>
        <input 
          type="number" 
          className="amount-field" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="recipients-section">
        <h3 style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>To</h3>
        <div className="recipients-scroll">
          {contacts.map((contact, index) => (
            <div 
              key={index} 
              className={`recipient ${selectedContact === index ? 'selected' : ''}`}
              onClick={() => setSelectedContact(index)}
            >
              <div className="recipient-avatar" style={{ background: contact.gradient }}>
                {contact.initials}
              </div>
              <span className="recipient-name">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="note-field-wrapper">
        <input 
          type="text" 
          id="transfer-note" 
          className="note-field" 
          placeholder=" "
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <label htmlFor="transfer-note" className="note-label">What's this for?</label>
      </div>

      <button className="send-btn" onClick={handleSend} disabled={isSending}>
        {isSending ? 'Processing...' : 'Send Money'}
      </button>

      {isSuccess && (
        <div className="success-overlay">
          <svg className="success-check" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" />
            <polyline points="28,52 44,68 72,36" />
          </svg>
          <div className="success-text">Transfer Complete!</div>
          <div className="success-amount">${amount || '0.00'} sent to {contacts[selectedContact].name}</div>
        </div>
      )}
    </div>
  );
};

export default TransferView;
