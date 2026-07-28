import React from 'react';
import '../styles/bento.css';

const SparklineCard = ({ className = '' }) => {
  return (
    <div className={`bento-card sparkline-card ${className}`} style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) 0.1s both' }}>
      <div className="card-header">
        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>7-Day Trend</div>
        <div style={{ color: 'var(--accent-teal)', fontSize: '0.875rem', fontWeight: 600 }}>+12.4%</div>
      </div>
      
      <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
        $4,800
      </div>
      
      <svg className="sparkline-svg" viewBox="0 0 200 60">
        <defs>
          <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-violet)" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        <path
          d="M0,50 Q20,40 40,45 T80,25 T120,35 T160,15 T200,20 L200,60 L0,60 Z"
          fill="url(#sparklineGrad)"
        />
        <path
          d="M0,50 Q20,40 40,45 T80,25 T120,35 T160,15 T200,20"
          fill="none"
          stroke="var(--accent-violet)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SparklineCard;
