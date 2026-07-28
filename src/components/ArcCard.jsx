import React from 'react';
import '../styles/bento.css';

const ArcCard = ({ title, value, total, color, icon: Icon, delay = 0, className = '' }) => {
  const percentage = Math.round((value / total) * 100);
  const strokeDasharray = 220; // Approx circumference for r=35
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div 
      className={`bento-card arc-card ${className}`}
      style={{ animation: `fadeInUp 0.5s var(--ease-out-expo) ${delay}s both` }}
    >
      <div className="card-header" style={{ width: '100%' }}>
        <span className="card-title">{title}</span>
        {Icon && <Icon size={18} color={color} />}
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.75rem 0' }}>
        <svg className="arc-svg" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="var(--border-light)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 1s var(--ease-out-expo)' }}
          />
        </svg>
        
        <div className="arc-center-text" style={{ color }}>
          {percentage}%
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          ${value.toLocaleString()}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
          of ${total.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ArcCard;
