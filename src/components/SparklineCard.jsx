import React from 'react';
import '../styles/bento.css';

const SparklineCard = ({ title = '7-Day Trend' }) => {
  const data = [3200, 3800, 3400, 4100, 3900, 4500, 4800];
  
  // Calculate points for viewBox="0 0 200 80"
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 200;
    const y = 80 - ((d - min) / range) * 70; // Leave 10px padding at top
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,80 ${points} 200,80`;

  return (
    <div className="bento-card bento-medium sparkline-card" style={{ animation: 'fadeInUp 0.5s var(--ease-out-expo) 0.1s both' }}>
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>+12.4%</div>
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold' }}>
        $4,800
      </div>
      <svg className="sparkline-svg" viewBox="0 0 200 80">
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-violet)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#sparkGradient)" />
        <polyline points={points} fill="none" stroke="var(--accent-violet)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default SparklineCard;
