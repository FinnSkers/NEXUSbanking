// Extended Backend API & Data Persistence Service for NEXUS Banking

const INITIAL_TRANSACTIONS = [
  { id: 'tx-1', name: 'Apple Store', category: 'Shopping', date: '2024-07-28', amount: -299.00, color: '#1a1a2e', icon: 'ShoppingBag', status: 'Completed', ref: 'NEX-892301' },
  { id: 'tx-2', name: 'Salary Deposit', category: 'Income', date: '2024-07-27', amount: 4500.00, color: '#14b8a6', icon: 'Briefcase', status: 'Completed', ref: 'NEX-892302' },
  { id: 'tx-3', name: 'Spotify Premium', category: 'Entertainment', date: '2024-07-25', amount: -9.99, color: '#8b5cf6', icon: 'Music', status: 'Completed', ref: 'NEX-892303' },
  { id: 'tx-4', name: 'Transfer to Jane', category: 'Transfers', date: '2024-07-24', amount: -250.00, color: '#6366f1', icon: 'ArrowUpRight', status: 'Completed', ref: 'NEX-892304' },
  { id: 'tx-5', name: 'Freelance Payment', category: 'Income', date: '2024-07-23', amount: 1200.00, color: '#f59e0b', icon: 'DollarSign', status: 'Completed', ref: 'NEX-892305' },
];

const INITIAL_VAULTS = [
  { id: 'v-1', name: 'Emergency Fund', saved: 6400, target: 10000, category: 'Safety', color: '#14b8a6', icon: 'ShieldCheck' },
  { id: 'v-2', name: 'Summer Vacation', saved: 2150, target: 3500, category: 'Travel', color: '#ff6b6b', icon: 'Plane' },
  { id: 'v-3', name: 'New Laptop', saved: 1800, target: 2400, category: 'Tech', color: '#8b5cf6', icon: 'Laptop' },
];

const INITIAL_FX = {
  USD: 48259.40,
  EUR: 12500.00,
  GBP: 8400.00,
  JPY: 450000.00,
};

const FX_RATES = {
  USD_EUR: 0.92,
  USD_GBP: 0.78,
  USD_JPY: 155.20,
  EUR_USD: 1.09,
  GBP_USD: 1.28,
  JPY_USD: 0.0064,
};

const INITIAL_BILLS = [
  { id: 'b-1', name: 'Electricity Bill', provider: 'PowerCorp', amount: 120.00, dueDate: '2024-08-05', isPaid: false, category: 'Utilities', color: '#ef4444' },
  { id: 'b-2', name: 'Fiber Internet', provider: 'HyperSpeed Net', amount: 69.99, dueDate: '2024-08-08', isPaid: false, category: 'Utilities', color: '#6366f1' },
  { id: 'b-3', name: 'Gym Membership', provider: 'FitFlex Gym', amount: 49.99, dueDate: '2024-08-12', isPaid: true, category: 'Fitness', color: '#14b8a6' },
  { id: 'b-4', name: 'Apartment Rent', provider: 'Urban Living', amount: 1800.00, dueDate: '2024-08-01', isPaid: false, category: 'Housing', color: '#f59e0b' },
];

const INITIAL_INVESTMENTS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 224.50, change: 1.85, shares: 12, value: 2694.00, type: 'Stock' },
  { symbol: 'TSLA', name: 'Tesla Motors', price: 246.80, change: -2.10, shares: 5, value: 1234.00, type: 'Stock' },
  { symbol: 'BTC', name: 'Bitcoin', price: 67450.00, change: 4.20, shares: 0.08, value: 5396.00, type: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3480.00, change: 3.10, shares: 1.2, value: 4176.00, type: 'Crypto' },
];

const getDB = () => {
  const txs = localStorage.getItem('nexus_db_txs');
  const balance = localStorage.getItem('nexus_db_balance');
  const vaults = localStorage.getItem('nexus_db_vaults');
  const fx = localStorage.getItem('nexus_db_fx');
  const bills = localStorage.getItem('nexus_db_bills');
  const investments = localStorage.getItem('nexus_db_investments');

  return {
    transactions: txs ? JSON.parse(txs) : INITIAL_TRANSACTIONS,
    balance: balance ? parseFloat(balance) : 48259.40,
    vaults: vaults ? JSON.parse(vaults) : INITIAL_VAULTS,
    fx: fx ? JSON.parse(fx) : INITIAL_FX,
    bills: bills ? JSON.parse(bills) : INITIAL_BILLS,
    investments: investments ? JSON.parse(investments) : INITIAL_INVESTMENTS,
  };
};

const saveDB = (db) => {
  localStorage.setItem('nexus_db_txs', JSON.stringify(db.transactions));
  localStorage.setItem('nexus_db_balance', db.balance.toString());
  localStorage.setItem('nexus_db_vaults', JSON.stringify(db.vaults));
  localStorage.setItem('nexus_db_fx', JSON.stringify(db.fx));
  localStorage.setItem('nexus_db_bills', JSON.stringify(db.bills));
  localStorage.setItem('nexus_db_investments', JSON.stringify(db.investments));
};

export const api = {
  getOverview: async () => {
    const db = getDB();
    return {
      balance: db.balance,
      income: db.transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0),
      expenses: db.transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0),
      recentTransactions: db.transactions.slice(0, 5),
    };
  },

  getTransactions: async () => {
    return getDB().transactions;
  },

  createTransaction: async (data) => {
    const db = getDB();
    const newTx = {
      id: `tx-${Date.now()}`,
      name: data.name,
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
    return newTx;
  },

  // Vaults
  getVaults: async () => getDB().vaults,
  createVault: async (vault) => {
    const db = getDB();
    const newVault = { id: `v-${Date.now()}`, ...vault, saved: 0 };
    db.vaults.push(newVault);
    saveDB(db);
    return newVault;
  },
  depositVault: async (vaultId, amount) => {
    const db = getDB();
    const vault = db.vaults.find(v => v.id === vaultId);
    if (vault && db.balance >= amount) {
      vault.saved += amount;
      db.balance -= amount;
      db.transactions.unshift({
        id: `tx-${Date.now()}`,
        name: `Vault Deposit: ${vault.name}`,
        category: 'Savings',
        date: new Date().toISOString().split('T')[0],
        amount: -amount,
        color: vault.color,
        icon: 'ShieldCheck',
        status: 'Completed',
        ref: `NEX-${Math.floor(100000 + Math.random() * 900000)}`
      });
      saveDB(db);
      return { vault, balance: db.balance };
    }
    throw new Error('Insufficient balance or vault not found');
  },

  // Multi-currency FX
  getFX: async () => ({ balances: getDB().fx, rates: FX_RATES }),
  swapFX: async (fromCurr, toCurr, fromAmount) => {
    const db = getDB();
    const rateKey = `${fromCurr}_${toCurr}`;
    const rate = FX_RATES[rateKey] || 1;
    const toAmount = fromAmount * rate;

    if (db.fx[fromCurr] >= fromAmount) {
      db.fx[fromCurr] -= fromAmount;
      db.fx[toCurr] = (db.fx[toCurr] || 0) + toAmount;
      saveDB(db);
      return { balances: db.fx, swappedAmount: toAmount };
    }
    throw new Error(`Insufficient ${fromCurr} balance`);
  },

  // Bills
  getBills: async () => getDB().bills,
  payBill: async (billId) => {
    const db = getDB();
    const bill = db.bills.find(b => b.id === billId);
    if (bill && !bill.isPaid && db.balance >= bill.amount) {
      bill.isPaid = true;
      db.balance -= bill.amount;
      db.transactions.unshift({
        id: `tx-${Date.now()}`,
        name: `Bill Pay: ${bill.name}`,
        category: 'Expenses',
        date: new Date().toISOString().split('T')[0],
        amount: -bill.amount,
        color: bill.color,
        icon: 'Zap',
        status: 'Completed',
        ref: `NEX-${Math.floor(100000 + Math.random() * 900000)}`
      });
      saveDB(db);
      return { bill, balance: db.balance };
    }
    throw new Error('Bill already paid or insufficient funds');
  },

  // Credit Score & Loans
  getCredit: async () => ({
    score: 785,
    rating: 'Excellent',
    factors: [
      { name: 'Payment History', status: '100% On-time', score: 'Excellent', color: 'var(--accent-teal)' },
      { name: 'Credit Utilization', status: '14% Used', score: 'Good', color: 'var(--accent-teal)' },
      { name: 'Credit Age', status: '4.2 Years', score: 'Fair', color: 'var(--accent-amber)' },
      { name: 'Total Accounts', status: '6 Active', score: 'Good', color: 'var(--accent-teal)' },
    ],
    preApprovedLoan: {
      maxAmount: 15000,
      apr: 4.9,
      monthlyEstimate: 345,
    }
  }),
  applyLoan: async (amount) => {
    const db = getDB();
    db.balance += amount;
    db.transactions.unshift({
      id: `tx-${Date.now()}`,
      name: 'NEXUS Personal Loan Credit',
      category: 'Income',
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      color: 'var(--accent-violet)',
      icon: 'DollarSign',
      status: 'Completed',
      ref: `LOAN-${Math.floor(100000 + Math.random() * 900000)}`
    });
    saveDB(db);
    return { balance: db.balance };
  },

  // Investments
  getInvestments: async () => getDB().investments,
  exportCSV: (transactions) => {
    const headers = ['Transaction ID', 'Date', 'Name', 'Category', 'Amount', 'Status', 'Reference'];
    const rows = transactions.map(t => [t.id, t.date, `"${t.name}"`, t.category, t.amount.toFixed(2), t.status, t.ref]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `NEXUS_Transactions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  exportJSON: (transactions) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `NEXUS_Transactions.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
