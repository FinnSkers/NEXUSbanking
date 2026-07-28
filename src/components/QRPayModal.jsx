import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { QrCode, Camera, Copy, X, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../styles/qr_pay.css';

const QRPayModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('receive'); // 'receive' | 'scan'
  const [amount, setAmount] = useState('50.00');
  const [scannedSuccess, setScannedSuccess] = useState(false);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScannedSuccess(true);
    setTimeout(() => {
      addToast('QR Code Scanned! Received $50.00 from Sarah', 'success');
      setScannedSuccess(false);
      onClose();
    }, 1500);
  };

  const modalUI = (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div className="qr-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="qr-mode-picker">
          <button 
            className={`mode-tab ${mode === 'receive' ? 'active' : ''}`}
            onClick={() => setMode('receive')}
          >
            <QrCode size={16} /> My Payment QR
          </button>
          <button 
            className={`mode-tab ${mode === 'scan' ? 'active' : ''}`}
            onClick={() => setMode('scan')}
          >
            <Camera size={16} /> Scan QR Code
          </button>
        </div>

        {mode === 'receive' ? (
          <div className="qr-receive-body">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span className="qr-label">Requesting Amount</span>
              <div className="qr-amount-input">
                <span>$</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                />
              </div>
            </div>

            {/* Generated SVG QR Code Simulation */}
            <div className="qr-code-box">
              <svg viewBox="0 0 100 100" width="160" height="160">
                <rect width="100" height="100" fill="white" rx="8" />
                <path d="M10 10h30v30h-30zM60 10h30v30h-30zM10 60h30v30h-30z" fill="#1a1a2e" />
                <path d="M18 18h14v14h-14zM68 18h14v14h-14zM18 68h14v14h-14z" fill="white" />
                <path d="M22 22h6v6h-6zM72 22h6v6h-6zM22 72h6v6h-6z" fill="#8b5cf6" />
                <path d="M45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h10v10h-10zM50 45h10v10h-10zM70 45h20v10h-20zM45 60h10v10h-10zM60 60h10v10h-10zM80 60h10v10h-10zM45 80h20v10h-20zM75 75h15v15h-15z" fill="#1a1a2e" />
              </svg>
              <div className="qr-avatar-badge">NEXUS</div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              Scan with any banking camera app to pay Alex Doe.
            </div>
          </div>
        ) : (
          <div className="qr-scan-body">
            <div className={`camera-frame ${scannedSuccess ? 'success' : ''}`}>
              <div className="scan-line" />
              {scannedSuccess ? (
                <div className="scan-success-msg">
                  <CheckCircle size={48} color="var(--accent-teal)" />
                  <span>Payment Detected!</span>
                </div>
              ) : (
                <div className="camera-hint">Align QR code inside frame</div>
              )}
            </div>

            <button className="simulate-scan-btn" onClick={handleSimulateScan}>
              Simulate Instant QR Scan <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalUI, document.body);
};

export default QRPayModal;
