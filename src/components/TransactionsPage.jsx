import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Download,
  FileSpreadsheet,
  ShoppingBag,
  Briefcase,
  Music,
  ArrowUpRight,
  DollarSign,
  Dumbbell,
  Monitor,
  Zap,
  Coffee,
  ArrowDownLeft,
  Car,
  TrendingUp
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import TransactionModal from './TransactionModal';
import '../styles/transactions.css';

const iconMap = {
  ShoppingBag, Briefcase, Music, ArrowUpRight, DollarSign, Dumbbell, Monitor, Zap, Coffee, ArrowDownLeft, Car, TrendingUp
};

const FILTERS = ['All', 'Income', 'Expenses', 'Transfers', 'Shopping', 'Entertainment'];
const ITEMS_PER_PAGE = 8;

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    api.getTransactions().then(setTransactions);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || tx.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchQuery, activeFilter]);

  const stats = useMemo(() => {
    let income = 0;
    let expenses = 0;
    
    filteredTransactions.forEach(tx => {
      if (tx.amount > 0) income += tx.amount;
      else expenses += Math.abs(tx.amount);
    });

    return {
      income,
      expenses,
      net: income - expenses
    };
  }, [filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    api.exportCSV(filteredTransactions);
    addToast(`Exported ${filteredTransactions.length} transactions to CSV`, 'success');
  };

  const handleExportJSON = () => {
    api.exportJSON(filteredTransactions);
    addToast(`Exported ${filteredTransactions.length} transactions to JSON`, 'success');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'auto'
    }).format(amount);
  };

  return (
    <div className="transactions-page">
      <div className="transactions-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Transaction History</h1>
          <p>View, filter, and export all your past transactions.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="page-btn" onClick={handleExportCSV} title="Export CSV" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileSpreadsheet size={15} color="var(--accent-teal)" />
            <span>Export CSV</span>
          </button>
          <button className="page-btn" onClick={handleExportJSON} title="Export JSON" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Download size={15} color="var(--accent-violet)" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      <div className="transactions-stats">
        <div className="stat-card">
          <div className="stat-label">Total Income</div>
          <div className="stat-value income">{formatCurrency(stats.income)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value expense">{formatCurrency(stats.expenses)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Net Flow</div>
          <div className="stat-value net">{formatCurrency(stats.net)}</div>
        </div>
      </div>

      <div className="search-bar">
        <Search size={18} className="search-icon" color="var(--text-tertiary)" />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-row">
        {FILTERS.map(filter => (
          <button 
            key={filter}
            className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="tx-table">
        {paginatedTransactions.length > 0 ? (
          paginatedTransactions.map((tx, index) => {
            const IconComponent = iconMap[tx.icon] || ShoppingBag;
            const isPositive = tx.amount > 0;
            return (
              <div 
                key={tx.id} 
                className="tx-table-row"
                style={{ animationDelay: `${index * 0.04}s`, cursor: 'pointer' }}
                onClick={() => setSelectedTx(tx)}
              >
                <div className="tx-table-icon" style={{ backgroundColor: tx.color }}>
                  <IconComponent size={20} />
                </div>
                <div className="tx-table-info">
                  <div className="tx-table-name">{tx.name}</div>
                  <div className="tx-table-meta">
                    <span className="tx-table-date">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="tx-category-badge">{tx.category}</span>
                  </div>
                </div>
                <div className={`tx-table-amount ${isPositive ? 'positive' : ''}`}>
                  {isPositive ? '+' : ''}{formatCurrency(tx.amount)}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            No transactions found for your criteria.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="page-btn" 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {selectedTx && (
        <TransactionModal 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </div>
  );
}
