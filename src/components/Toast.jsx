import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import '../styles/toast.css';

const iconMap = {
  success: <CheckCircle className="toast-icon" color="var(--accent-teal)" size={20} />,
  error: <AlertCircle className="toast-icon" color="var(--accent-coral)" size={20} />,
  info: <Info className="toast-icon" color="var(--accent-violet)" size={20} />,
  warning: <AlertTriangle className="toast-icon" color="var(--accent-amber)" size={20} />
};

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          {iconMap[toast.type || 'info']}
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
