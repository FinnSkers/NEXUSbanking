// Simulated Backend API & Persistence Service for NEXUS Banking

const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', name: 'Apple Store', category: 'Shopping', date: '2024-07-28', amount: -299.00, color: '#1a1a2e', icon: 'ShoppingBag', status: 'Completed', ref: 'NEX-892301' },
  { id: 'tx-2', name: 'Salary Deposit', category: 'Income', date: '2024-07-27', amount: 4500.00, color: '#14b8a6', icon: 'Briefcase', status: 'Completed', ref: 'NEX-892302' },
  { id: 'tx-3', name: 'Spotify Premium', category: 'Entertainment', date: '2024-07-25', amount: -9.99, color: '#8b5cf6', icon: 'Music', status: 'Completed', ref: 'NEX-892303' },
  { id: 'tx-4', name: 'Transfer to Jane', category: 'Transfers', date: '2024-07-24', amount: -250.00, color: '#6366f1', icon: 'ArrowUpRight', status: 'Completed', ref: 'NEX-892304' },
  { id: 'tx-5', name: 'Freelance Payment', category: 'Income', date: '2024-07-23', amount: 1200.00, color: '#f59e0b', icon: 'DollarSign', status: 'Completed', ref: 'NEX-892305' },
  { id: 'tx-6', name: 'Amazon Purchase', category: 'Shopping', date: '2024-07-22', amount: -67.50, color: '#1a1a2e', icon: 'ShoppingBag', status: 'Completed', ref: 'NEX-892306' },
  { id: 'tx-7', name: 'Gym Membership', category: 'Expenses', date: '2024-07-21', amount: -49.99, color: '#ef4444', icon: 'Dumbbell', status: 'Completed', ref: 'NEX-892307' },
  { id: 'tx-8', name: 'Netflix', category: 'Entertainment', date: '2024-07-20', amount: -15.99, color: '#8b5cf6', icon: 'Monitor', status: 'Completed', ref: 'NEX-892308' },
  { id: 'tx-9', name: 'Client Invoice', category: 'Income', date: '2024-07-19', amount: 2800.00, color: '#14b8a6', icon: 'Briefcase', status: 'Completed', ref: 'NEX-892309' },
  { id: 'tx-10', name: 'Electric Bill', category: 'Expenses', date: '2024-07-18', amount: -120.00, color: '#ef4444', icon: 'Zap', status: 'Completed', ref: 'NEX-892310' },
  { id: 'tx-11', name: 'Coffee Shop', category: 'Expenses', date: '2024-07-17', amount: -5.50, color: '#f59e0b', icon: 'Coffee', status: 'Completed', ref: 'NEX-892311' },
  { id: 'tx-12', name: 'Transfer from Mike', category: 'Transfers', date: '2024-07-16', amount: 150.00, color: '#6366f1', icon: 'ArrowDownLeft', status: 'Completed', ref: 'NEX-892312' },
  { id: 'tx-13', name: 'Uber Ride', category: 'Expenses', date: '2024-07-15', amount: -23.40, color: '#1a1a2e', icon: 'Car', status: 'Completed', ref: 'NEX-892313' },
  { id: 'tx-14', name: 'Dividend Payout', category: 'Income', date: '2024-07-14', amount: 340.00, color: '#14b8a6', icon: 'TrendingUp', status: 'Completed', ref: 'NEX-892314' },
  { id: 'tx-15', name: 'YouTube Premium', category: 'Entertainment', date: '2024-07-13', amount: -13.99, color: '#8b5cf6', icon: 'Monitor', status: 'Completed', ref: 'NEX-892315' },
];

const INITIAL_CARD = {
  id: 'card-1',
  number: '4281 9012 3456 4281',
  cardholder: 'ALEX DOE',
  expiry: '12/28',
  cvv: '123',
  isFrozen: false,
  spendingLimit: 5000,
  currentSpent: 1240,
};

// Helper to access localStorage DB
const getDB = () => {
  const txs = localStorage.getItem('nexus_db_txs');
  const card = localStorage.getItem('nexus_db_card');
  const balance = localStorage.getItem('nexus_db_balance');

  return {
    transactions: txs ? JSON.parse(txs) : INITIAL_TRANSACTIONS,
    card: card ? JSON.parse(card) : INITIAL_CARD,
    balance: balance ? parseFloat(balance) : 48259.40,
  };
};

const saveDB = (db) => {
  localStorage.setItem('nexus_db_txs', JSON.stringify(db.transactions));
  localStorage.setItem('nexus_db_card', JSON.stringify(db.card));
  localStorage.setItem('nexus_db_balance', db.balance.toString());
};

export const api = {
  // Get overview data
  getOverview: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDB();
        const income = db.transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
        const expenses = db.transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
        resolve({
          balance: db.balance,
          income,
          expenses,
          recentTransactions: db.transactions.slice(0, 5),
        });
      }, 200);
    });
  },

  // Get all transactions
  getTransactions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDB();
        resolve(db.transactions);
      }, 150);
    });
  },

  // Create new transaction (e.g. transfer)
  createTransaction: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDB();
        const newTx = {
          id: `tx-${Date.now()}`,
          name: data.name || `Transfer to ${data.recipient || 'Recipient'}`,
          category: data.category || 'Transfers',
          date: new Date().toISOString().split('T')[0],
          amount: -Math.abs(parseFloat(data.amount)),
          color: '#6366f1',
          icon: 'ArrowUpRight',
          status: 'Completed',
          ref: `NEX-${Math.floor(100000 + Math.random() * 900000)}`,
          note: data.note || '',
        };
        db.transactions.unshift(newTx);
        db.balance += newTx.amount;
        saveDB(db);
        resolve(newTx);
      }, 300);
    });
  },

  // Get card data
  getCard: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDB();
        resolve(db.card);
      }, 150);
    });
  },

  // Update card settings
  updateCard: async (updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const db = getDB();
        db.card = { ...db.card, ...updates };
        saveDB(db);
        resolve(db.card);
      }, 200);
    });
  },

  // Export transactions to CSV
  exportCSV: (transactions) => {
    const headers = ['Transaction ID', 'Date', 'Name', 'Category', 'Amount', 'Status', 'Reference'];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      `"${t.name}"`,
      t.category,
      t.amount.toFixed(2),
      t.status,
      t.ref
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NEXUS_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Export transactions to JSON
  exportJSON: (transactions) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `NEXUS_Transactions_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
