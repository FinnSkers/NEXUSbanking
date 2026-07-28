import React, { useState } from 'react';
import { FileText, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import StatementModal from './StatementModal';
import NotificationsDrawer from './NotificationsDrawer';
import '../styles/profile.css';

const ProfileView = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [showStatement, setShowStatement] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  const handleSave = () => {
    addToast('Settings saved successfully!', 'success');
  };

  const handleLogout = () => {
    addToast('Logged out. See you soon!', 'info');
    setTimeout(() => logout(), 500);
  };

  return (
    <div className="profile-view" style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) both' }}>
      <div className="profile-header">
        <div className="profile-avatar">{user?.avatar || 'AD'}</div>
        <h2 className="profile-name">{user?.firstName} {user?.lastName}</h2>
        <div className="profile-subtitle">{user?.tier} Member · Joined {user?.memberSince}</div>
      </div>

      {/* Account Statement & Notifications Quick Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setShowStatement(true)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <FileText size={24} color="var(--accent-violet)" />
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Bank Statement</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Print or download PDF</div>
          </div>
        </button>

        <button 
          onClick={() => setShowNotificationsDrawer(true)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <Bell size={24} color="var(--accent-teal)" />
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Notifications</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-coral)', fontWeight: '600' }}>3 Unread alerts</div>
          </div>
        </button>
      </div>

      <div className="profile-card">
        <h3 className="profile-card-title">Personal Information</h3>
        <div className="form-grid">
          <div className="field-group">
            <label className="field-label">First Name</label>
            <input type="text" className="field-input" defaultValue={user?.firstName} />
          </div>
          <div className="field-group">
            <label className="field-label">Last Name</label>
            <input type="text" className="field-input" defaultValue={user?.lastName} />
          </div>
          <div className="field-group full-width">
            <label className="field-label">Email</label>
            <input type="email" className="field-input" defaultValue={user?.email} />
          </div>
          <div className="field-group full-width">
            <label className="field-label">Phone Number</label>
            <input type="tel" className="field-input" defaultValue={user?.phone} />
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h3 className="profile-card-title">Preferences</h3>
        <div className="pref-item">
          <div className="pref-info">
            <h4>Dark Mode</h4>
            <p style={{ color: 'var(--text-tertiary)' }}>Toggle dark appearance</p>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="pref-item">
          <div className="pref-info">
            <h4>Push Notifications</h4>
            <p style={{ color: 'var(--text-tertiary)' }}>Receive alerts and updates</p>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="pref-item">
          <div className="pref-info">
            <h4>Biometric Login</h4>
            <p style={{ color: 'var(--text-tertiary)' }}>Use Face ID or Touch ID</p>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={biometric} onChange={(e) => setBiometric(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>Save Changes</button>
      <button 
        className="save-btn" 
        onClick={handleLogout}
        style={{ 
          marginTop: '0.75rem',
          background: 'none', 
          border: '1px solid var(--accent-coral)',
          color: 'var(--accent-coral)',
          boxShadow: 'none'
        }}
      >
        Log Out
      </button>

      <StatementModal isOpen={showStatement} onClose={() => setShowStatement(false)} />
      <NotificationsDrawer isOpen={showNotificationsDrawer} onClose={() => setShowNotificationsDrawer(false)} />
    </div>
  );
};

export default ProfileView;
