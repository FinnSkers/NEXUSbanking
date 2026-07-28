import React from 'react';
import '../styles/skeleton.css';

export const SkeletonCard = ({ width, height, className = '' }) => (
  <div 
    className={`skeleton skeleton-card ${className}`} 
    style={{ width: width || '100%', height: height || '100%' }}
  />
);

export const SkeletonText = ({ width = '100%', className = '' }) => (
  <div 
    className={`skeleton skeleton-text ${className}`} 
    style={{ width }}
  />
);

export const SkeletonCircle = ({ size = 48, className = '' }) => (
  <div 
    className={`skeleton skeleton-circle ${className}`} 
    style={{ width: size, height: size, minWidth: size }}
  />
);

export const SkeletonDashboard = () => (
  <div className="skeleton-dashboard">
    <SkeletonCard className="skeleton-large" />
    <SkeletonCard className="skeleton-small" />
    <SkeletonCard className="skeleton-small" />
    <SkeletonCard className="skeleton-wide" />
    <SkeletonCard className="skeleton-medium" />
    <SkeletonCard className="skeleton-medium" />
  </div>
);
