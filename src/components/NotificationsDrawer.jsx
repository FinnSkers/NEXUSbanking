import React, { useState } from 'react';
import { Bell, X, Check, ShieldAlert, DollarSign, Zap, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../styles/notifications.css';

const INITIAL_NOTIFS = [
  { id: 1, title: 'Salary Deposit Received', desc: '+$4,500.00 credited to main account from ACME Corp.', time: 'Today, 09:00 AM', unread: true, icon: DollarSign, color: '#14b8a6' },
  { id: 2, title: 'Security Alert', desc: 'New login detected from Chrome on Windows (IP 192.168.1.42).', time: 'Yesterday, 04:15 PM', unread: true, icon: ShieldAlert, color: '#ef4444' },
  { id: 3, title: 'Bill Reminder', desc: 'Electricity bill of $120.00 is due in 7 days.', time: 'Jul 26', unread: true, icon: Zap, color: '#f59e0b' },
  { id: 4, title: 'Vault Goal Reached', desc: 'Emergency Fund vault reached 64% of target!', time: 'Jul 24', unread: false, icon: CheckCircle2, color: '#8b5cf6' },
];

const NotificationsDrawer = ({ isOpen, onClose }) => {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const { addToast } = useToast();

  if (!isOpen) return null;

  const unreadCount = notifs.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
    addToast('All notifications marked as read', 'info');
  };

  const handleClearAll = () => {
    setNotifs([]);
    addToast('Notifications cleared', 'info');
  };

  const toggleRead = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  return (
    <div className="notifications-drawer-backdrop" onClick={onClose}>
      <div className="notifications-drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} color="var(--accent-violet)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>Notifications</h3>
            {unreadCount > 0 && <span className="drawer-badge">{unreadCount}</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="drawer-text-btn">
                Mark read
              </button>
            )}
            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="drawer-body">
          {notifs.length > 0 ? (
            notifs.map(n => {
              const Icon = n.icon;
              return (
                <div 
                  key={n.id} 
                  className={`notification-item ${n.unread ? 'unread' : ''}`}
                  onClick={() => toggleRead(n.id)}
                >
                  <div className="notif-icon-circle" style={{ backgroundColor: n.color }}>
                    <Icon size={18} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.15rem' }}>{n.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>{n.desc}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{n.time}</div>
                  </div>
                  {n.unread && <div className="unread-dot" />}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-tertiary)' }}>
              No new notifications.
            </div>
          )}
        </div>

        {notifs.length > 0 && (
          <div className="drawer-footer">
            <button className="clear-all-btn" onClick={handleClearAll}>
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDrawer;
