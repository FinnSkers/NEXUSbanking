import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, Copy, ShieldCheck, Wifi, Eye, EyeOff, Sparkles, CreditCard as CardIcon } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import '../styles/cards.css';

const DEFAULT_CARD = {
  id: 'card-1',
  number: '4281  9012  3456  4281',
  cardholder: 'ALEX DOE',
  expiry: '12/28',
  cvv: '849',
  isFrozen: false,
  spendingLimit: 5000,
  currentSpent: 1240,
};

const CARD_THEMES = [
  { id: 'obsidian', name: 'Obsidian Black', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)', accent: '#8b5cf6' },
  { id: 'violet', name: 'Cosmic Violet', background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c026d3 100%)', accent: '#e879f9' },
  { id: 'titanium', name: 'Titanium Gold', background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #b45309 100%)', accent: '#fbbf24' },
];

const CreditCard3D = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMouseLeave, setIsMouseLeave] = useState(true);
  const [cardData, setCardData] = useState(DEFAULT_CARD);
  const [spendingLimit, setSpendingLimit] = useState(5000);
  const [showPIN, setShowPIN] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
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
    navigator.clipboard.writeText(cardData?.cvv || '849');
    addToast('CVV copied to clipboard!', 'info');
  };

  return (
    <div className="cards-page-layout">
      {/* Theme Picker */}
      <div className="card-theme-picker">
        {CARD_THEMES.map(theme => (
          <button 
            key={theme.id}
            className={`theme-chip ${selectedTheme.id === theme.id ? 'active' : ''}`}
            onClick={() => setSelectedTheme(theme)}
          >
            <span className="theme-color-dot" style={{ background: theme.background }} />
            <span>{theme.name}</span>
          </button>
        ))}
      </div>

      {/* 3D Card Interactive Stage */}
      <div className="card3d-stage">
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
            {/* FRONT FACE */}
            <div className="card3d-face card3d-front" style={{ background: selectedTheme.background }}>
              <div className="card3d-shimmer"></div>
              
              <div className="card3d-top-bar">
                <div className="emv-chip">
                  <div className="chip-line horizontal" />
                  <div className="chip-line vertical" />
                </div>
                <Wifi size={20} className="contactless-icon" />
                <div className="card3d-brand">NEXUS</div>
              </div>

              <div className="card3d-number">
                {cardData?.number || '4281  9012  3456  4281'}
              </div>

              <div className="card3d-details">
                <div>
                  <div className="card3d-label">Cardholder</div>
                  <div className="card3d-value">{cardData?.cardholder || 'ALEX DOE'}</div>
                </div>
                <div>
                  <div className="card3d-label">Expires</div>
                  <div className="card3d-value">{cardData?.expiry || '12/28'}</div>
                </div>
                <div className="card-network-logo">
                  <div className="network-circle red" />
                  <div className="network-circle orange" />
                </div>
              </div>

              {cardData?.isFrozen && (
                <div className="frozen-overlay">
                  <Lock size={36} />
                  <span>CARD FROZEN</span>
                </div>
              )}
            </div>
            
            {/* BACK FACE */}
            <div className="card3d-face card3d-back" style={{ background: selectedTheme.background }}>
              <div className="card3d-magnetic"></div>
              
              <div className="card3d-cvv-strip">
                <div className="signature-pattern" />
                <div className="cvv-box" onClick={handleCopyCVV} title="Click to copy CVV">
                  <span className="cvv-label">CVV</span>
                  <span className="cvv-val">{cardData?.cvv || '849'}</span>
                </div>
              </div>

              <div className="card3d-back-info">
                <p>Authorized signature · Not valid unless signed</p>
                <p>Issued by NEXUS Bank N.A. Member FDIC</p>
              </div>

              <div className="card3d-flip-hint">Click card to flip</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Controls Panel */}
      <div className="card-controls-panel">
        <div className="control-row">
          <div className="control-info">
            {cardData?.isFrozen ? <Lock size={20} color="var(--accent-coral)" /> : <Unlock size={20} color="var(--accent-teal)" />}
            <div>
              <h4>{cardData?.isFrozen ? 'Card Frozen' : 'Card Active'}</h4>
              <p>{cardData?.isFrozen ? 'All in-store & online payments blocked' : 'Card ready for all transactions'}</p>
            </div>
          </div>
          <button className={`control-btn ${cardData?.isFrozen ? 'unfreeze' : 'freeze'}`} onClick={handleFreezeToggle}>
            {cardData?.isFrozen ? 'Unfreeze' : 'Freeze Card'}
          </button>
        </div>

        {/* Monthly Limit Slider */}
        <div className="control-row-slider">
          <div className="control-info">
            <ShieldCheck size={20} color="var(--accent-violet)" />
            <div>
              <h4>Monthly Limit</h4>
              <p>${cardData?.currentSpent || 1240} spent of ${spendingLimit.toLocaleString()}</p>
            </div>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
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
              <span style={{ fontWeight: '700', color: 'var(--accent-violet)' }}>${spendingLimit.toLocaleString()} Limit</span>
              <span>$20,000</span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="control-actions-row">
          <button className="card-action-btn" onClick={handleCopyCardNumber}>
            <Copy size={16} /> Copy Number
          </button>
          <button className="card-action-btn" onClick={handleCopyCVV}>
            <Copy size={16} /> Copy CVV
          </button>
          <button className="card-action-btn" onClick={() => setShowPIN(!showPIN)}>
            {showPIN ? <EyeOff size={16} /> : <Eye size={16} />} {showPIN ? 'PIN: 9102' : 'View PIN'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCard3D;
