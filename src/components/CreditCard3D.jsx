import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Copy, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/cards.css';

const DEFAULT_CARD = {
  id: 'card-1',
  number: '4281 9012 3456 4281',
  cardholder: 'ALEX DOE',
  expiry: '12/28',
  cvv: '123',
  isFrozen: false,
  spendingLimit: 5000,
  currentSpent: 1240,
};

const CreditCard3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMouseLeave, setIsMouseLeave] = useState(true);
  const [cardData, setCardData] = useState(DEFAULT_CARD);
  const [spendingLimit, setSpendingLimit] = useState(5000);
  const cardRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    api.getCard().then(data => {
      if (data) {
        setCardData(data);
        setSpendingLimit(data.spendingLimit || 5000);
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    setIsMouseLeave(false);
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
    
    cardRef.current.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    setIsMouseLeave(true);
    setRotation({ x: 0, y: 0 });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFreezeToggle = async () => {
    const newStatus = !(cardData?.isFrozen);
    const updated = await api.updateCard({ isFrozen: newStatus });
    setCardData(updated || { ...cardData, isFrozen: newStatus });
    addToast(newStatus ? 'Card frozen successfully' : 'Card unfrozen', newStatus ? 'warning' : 'success');
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setSpendingLimit(newLimit);
  };

  const handleLimitCommit = async () => {
    await api.updateCard({ spendingLimit });
    addToast(`Monthly spending limit set to $${spendingLimit.toLocaleString()}`, 'info');
  };

  const handleCopyCardNumber = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cardData?.number?.replace(/\s/g, '') || '4281901234564281');
    addToast('Card number copied to clipboard!', 'info');
  };

  const handleCopyCVV = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cardData?.cvv || '123');
    addToast('CVV copied to clipboard!', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <div className="card3d-container">
        <div 
          ref={cardRef}
          className={`card3d-wrapper ${isMouseLeave ? 'smooth-reset' : ''} ${isFlipped ? 'flipped' : ''} ${cardData?.isFrozen ? 'frozen' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleFlip}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${isFlipped ? rotation.y + 180 : rotation.y}deg)`
          }}
        >
          <div className="card3d-face card3d-front">
            <div className="card3d-shimmer"></div>
            <div className="card3d-chip"></div>
            <div className="card3d-brand">NEXUS</div>
            <div className="card3d-number">
              {cardData?.number || '**** **** **** 4281'}
            </div>
            <div className="card3d-details">
              <div>
                <div className="card3d-label">Cardholder Name</div>
                <div className="card3d-value">{cardData?.cardholder || 'ALEX DOE'}</div>
              </div>
              <div>
                <div className="card3d-label">Expiry</div>
                <div className="card3d-value">{cardData?.expiry || '12/28'}</div>
              </div>
            </div>

            {cardData?.isFrozen && (
              <div className="frozen-overlay">
                <Lock size={32} />
                <span>CARD FROZEN</span>
              </div>
            )}
          </div>
          
          <div className="card3d-face card3d-back">
            <div className="card3d-magnetic"></div>
            <div className="card3d-cvv-area" onClick={handleCopyCVV} title="Click to copy CVV">
              <span className="card3d-label" style={{color: '#1a1a2e', marginRight: '8px'}}>CVV</span>
              {cardData?.cvv || '123'}
            </div>
            <div className="card3d-flip-hint">Click to flip back</div>
          </div>
        </div>
      </div>

      {/* Card Controls Panel */}
      <div className="card-controls-panel">
        <div className="control-row">
          <div className="control-info">
            {cardData?.isFrozen ? <Lock size={20} color="var(--accent-coral)" /> : <Unlock size={20} color="var(--accent-teal)" />}
            <div>
              <h4>{cardData?.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</h4>
              <p>{cardData?.isFrozen ? 'Re-enable in-store & online purchases' : 'Instantly block all new transactions'}</p>
            </div>
          </div>
          <button className={`control-btn ${cardData?.isFrozen ? 'unfreeze' : 'freeze'}`} onClick={handleFreezeToggle}>
            {cardData?.isFrozen ? 'Unfreeze' : 'Freeze'}
          </button>
        </div>

        <div className="control-row-slider">
          <div className="control-info">
            <ShieldCheck size={20} color="var(--accent-violet)" />
            <div>
              <h4>Monthly Spending Limit</h4>
              <p>Current spent: ${cardData?.currentSpent || 1240} of ${spendingLimit.toLocaleString()}</p>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <input 
              type="range" 
              min="1000" 
              max="20000" 
              step="500"
              value={spendingLimit}
              onChange={handleLimitChange}
              onMouseUp={handleLimitCommit}
              onTouchEnd={handleLimitCommit}
              className="limit-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
              <span>$1,000</span>
              <span style={{ fontWeight: '700', color: 'var(--accent-violet)' }}>${spendingLimit.toLocaleString()}</span>
              <span>$20,000</span>
            </div>
          </div>
        </div>

        <div className="control-actions-row">
          <button className="card-action-btn" onClick={handleCopyCardNumber}>
            <Copy size={16} /> Copy Number
          </button>
          <button className="card-action-btn" onClick={handleCopyCVV}>
            <Copy size={16} /> Copy CVV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCard3D;
