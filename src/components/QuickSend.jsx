import React from 'react';
import '../styles/bento.css';

const QuickSend = () => {
  const contacts = [
    { name: 'Jane', initials: 'JD', gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' },
    { name: 'Mike', initials: 'MS', gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)' },
    { name: 'Sarah', initials: 'SK', gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)' },
    { name: 'Tom', initials: 'TW', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
    { name: 'Lisa', initials: 'LR', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
    { name: 'Add', initials: '+', gradient: 'none', isAdd: true },
  ];

  return (
    <div className="bento-card bento-large" style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) 0.4s both' }}>
      <div className="card-header">
        <div className="card-title">Quick Send</div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Frequent contacts</span>
      </div>
      
      <div className="quick-send-avatars">
        {contacts.map((c, i) => (
          <div key={i} className="avatar-bubble">
            <div 
              className={`avatar-circle ${c.isAdd ? 'add' : ''}`}
              style={{ background: c.gradient }}
            >
              {c.initials}
            </div>
            <div className="avatar-name">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSend;
