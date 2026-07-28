import React from 'react';
import '../styles/bento.css';

const ArcCard = ({ title, value, total, color, icon: Icon, delay }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = value / total;
  const offset = circumference - progress * circumference;
  
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="bento-card arc-card" style={{ animation: `fadeInUp 0.5s var(--ease-out-expo) ${delay}s both` }}>
      <div className="card-header" style={{ width: '100%' }}>
        <div className="card-title">{title}</div>
        <Icon size={20} color={color} />
      </div>
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
        <svg className="arc-svg" viewBox="0 0 100 100" style={{ '--circumference': circumference, '--offset': offset }}>
          {/* Background Circle */}
          <circle 
            cx="50" cy="50" r={radius} 
            fill="none" 
            stroke="var(--bg-elevated, #f3f4f6)" 
            strokeWidth="8" 
          />
          {/* Progress Circle */}
          <circle 
            cx="50" cy="50" r={radius} 
            fill="none" 
            stroke={color} 
            strokeWidth="8" 
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              animation: 'drawCircle 1.5s var(--ease-out-expo) forwards'
            }}
          />
        </svg>
        <div className="arc-center-text">{percentage}%</div>
      </div>
      
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold' }}>
        ${value.toLocaleString()}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        of ${total.toLocaleString()}
      </div>
    </div>
  );
};

export default ArcCard;
