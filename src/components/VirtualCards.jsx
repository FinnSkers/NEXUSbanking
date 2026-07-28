import React, { useState } from 'react';
import { Ghost, ShieldCheck, RefreshCw, Plus, Copy, Lock, Trash2, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../styles/virtual_cards.css';

const INITIAL_GHOST_CARDS = [
  { id: 'vc-1', name: 'Amazon Shopping', number: '4829 •••• •••• 9102', cvv: '849', expiry: '08/26', limit: 250, spent: 45, merchant: 'Amazon', singleUse: false, color: 'linear-gradient(135deg, #0f172a, #334155)' },
  { id: 'vc-2', name: 'Netflix Subscription', number: '4829 •••• •••• 3041', cvv: '129', expiry: '11/25', limit: 30, spent: 19.99, merchant: 'Netflix', singleUse: false, color: 'linear-gradient(135deg, #831843, #be123c)' },
  { id: 'vc-3', name: 'Single-Use Burner', number: '4829 •••• •••• 7712', cvv: '502', expiry: '07/24', limit: 100, spent: 0, merchant: 'Any Merchant', singleUse: true, color: 'linear-gradient(135deg, #4c1d95, #7c3aed)' },
];

const VirtualCards = () => {
  const [cards, setCards] = useState(INITIAL_GHOST_CARDS);
  const [cardName, setCardName] = useState('');
  const [limit, setLimit] = useState('150');
  const [isSingleUse, setIsSingleUse] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { addToast } = useToast();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!cardName) return;

    const newCard = {
      id: `vc-${Date.now()}`,
      name: cardName,
      number: `4829 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      cvv: `${Math.floor(100 + Math.random() * 900)}`,
      expiry: '12/27',
      limit: parseFloat(limit) || 100,
      spent: 0,
      merchant: isSingleUse ? 'Single-Use Burner' : cardName,
      singleUse: isSingleUse,
      color: isSingleUse ? 'linear-gradient(135deg, #4c1d95, #7c3aed)' : 'linear-gradient(135deg, #0f172a, #1e293b)'
    };

    setCards([newCard, ...cards]);
    setCardName('');
    setShowForm(false);
    addToast(`Ghost card "${newCard.name}" created!`, 'success');
  };

  const handleDelete = (id, name) => {
    setCards(cards.filter(c => c.id !== id));
    addToast(`Ghost card "${name}" deleted`, 'info');
  };

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num.replace(/\s/g, ''));
    addToast('Card number copied to clipboard!', 'info');
  };

  return (
    <div className="virtual-cards-container">
      <div className="vc-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Ghost size={24} color="var(--accent-violet)" />
            <h2>Virtual Ghost Cards</h2>
          </div>
          <p>Generate single-use or merchant-locked virtual cards for ultra-safe online checkout.</p>
        </div>

        <button className="create-vc-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> New Ghost Card
        </button>
      </div>

      {showForm && (
        <form className="create-vc-form" onSubmit={handleCreate}>
          <h3>Create Virtual Ghost Card</h3>
          <div className="form-grid">
            <div>
              <label>Card Label / Merchant</label>
              <input 
                type="text" 
                placeholder="e.g. Uber, Steam, Shopping" 
                value={cardName} 
                onChange={e => setCardName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Spending Limit ($)</label>
              <input 
                type="number" 
                placeholder="150" 
                value={limit} 
                onChange={e => setLimit(e.target.value)} 
              />
            </div>
          </div>

          <label className="checkbox-row">
            <input 
              type="checkbox" 
              checked={isSingleUse} 
              onChange={e => setIsSingleUse(e.target.checked)} 
            />
            <span>Single-Use Burner (Auto-destroys immediately after 1 transaction)</span>
          </label>

          <button type="submit" className="submit-vc-btn">
            Generate Ghost Card
          </button>
        </form>
      )}

      <div className="vc-grid">
        {cards.map(card => (
          <div key={card.id} className="vc-card" style={{ background: card.color }}>
            <div className="vc-card-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Ghost size={18} color="rgba(255,255,255,0.8)" />
                <span className="vc-badge">{card.singleUse ? 'Single-Use' : 'Merchant Lock'}</span>
              </div>
              <button className="vc-delete-btn" onClick={() => handleDelete(card.id, card.name)}>
                <Trash2 size={16} />
              </button>
            </div>

            <div className="vc-card-name">{card.name}</div>
            <div className="vc-card-number">{card.number}</div>

            <div className="vc-card-bottom">
              <div>
                <span className="vc-label">CVV</span>
                <span className="vc-val">{card.cvv}</span>
              </div>
              <div>
                <span className="vc-label">EXP</span>
                <span className="vc-val">{card.expiry}</span>
              </div>
              <button className="vc-copy-btn" onClick={() => handleCopy(card.number)}>
                <Copy size={14} /> Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualCards;
