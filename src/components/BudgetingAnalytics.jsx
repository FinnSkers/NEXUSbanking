import React, { useState } from 'react';
import { PieChart, ShoppingBag, Utensils, Zap, Film, AlertCircle } from 'lucide-react';
import '../styles/budgeting.css';

const CATEGORIES = [
  { id: '1', name: 'Shopping & Retail', spent: 620, cap: 800, color: '#8b5cf6', icon: ShoppingBag },
  { id: '2', name: 'Food & Dining', spent: 480, cap: 500, color: '#f59e0b', icon: Utensils },
  { id: '3', name: 'Bills & Utilities', spent: 340, cap: 400, color: '#14b8a6', icon: Zap },
  { id: '4', name: 'Entertainment', spent: 210, cap: 300, color: '#ec4899', icon: Film },
];

const BudgetingAnalytics = () => {
  const [categories, setCategories] = useState(CATEGORIES);

  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalCap = categories.reduce((sum, c) => sum + c.cap, 0);

  return (
    <div className="budgeting-card">
      <div className="budget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PieChart size={22} color="var(--accent-violet)" />
          <h3>Monthly Budget Limits</h3>
        </div>
        <span className="budget-total-badge">
          ${totalSpent} / ${totalCap} Spent
        </span>
      </div>

      <div className="category-list">
        {categories.map(cat => {
          const Icon = cat.icon;
          const pct = Math.min(100, Math.round((cat.spent / cat.cap) * 100));
          const isWarning = pct >= 90;

          return (
            <div key={cat.id} className="budget-cat-item">
              <div className="cat-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="cat-icon" style={{ backgroundColor: cat.color }}>
                    <Icon size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{cat.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>${cat.spent} of ${cat.cap}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`pct-tag ${isWarning ? 'warning' : ''}`}>{pct}%</span>
                </div>
              </div>

              <div className="budget-progress-track">
                <div 
                  className={`budget-progress-bar ${isWarning ? 'warning' : ''}`}
                  style={{ width: `${pct}%`, backgroundColor: isWarning ? 'var(--accent-coral)' : cat.color }}
                />
              </div>

              {isWarning && (
                <div className="budget-warning-text">
                  <AlertCircle size={12} /> Near monthly cap limit!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetingAnalytics;
