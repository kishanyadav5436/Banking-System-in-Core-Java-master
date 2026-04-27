import type { Account, Customer, Transaction, DashboardStats } from '../types';

// ================================================================
// MOCK DATA — Simulates the Bank.dat records from the Java backend
// Each record has: accountNo, name, month, day, year, balance
// ================================================================

export const mockAccounts: Account[] = [
  { id: '1', accountNo: '1001', customerName: 'Rahul Sharma', balance: 125000, lastTransactionDate: '2026-04-20', status: 'active', type: 'savings', createdAt: '2025-01-15' },
  { id: '2', accountNo: '1002', customerName: 'Priya Patel', balance: 450000, lastTransactionDate: '2026-04-22', status: 'active', type: 'current', createdAt: '2025-02-20' },
  { id: '3', accountNo: '1003', customerName: 'Amit Kumar', balance: 78500, lastTransactionDate: '2026-04-18', status: 'active', type: 'savings', createdAt: '2025-03-10' },
  { id: '4', accountNo: '1004', customerName: 'Sneha Gupta', balance: 230000, lastTransactionDate: '2026-04-25', status: 'active', type: 'fixed', createdAt: '2025-04-05' },
  { id: '5', accountNo: '1005', customerName: 'Vikram Singh', balance: 15200, lastTransactionDate: '2026-03-30', status: 'inactive', type: 'savings', createdAt: '2025-05-12' },
  { id: '6', accountNo: '1006', customerName: 'Ananya Reddy', balance: 890000, lastTransactionDate: '2026-04-24', status: 'active', type: 'current', createdAt: '2025-06-01' },
  { id: '7', accountNo: '1007', customerName: 'Deepak Joshi', balance: 56000, lastTransactionDate: '2026-04-15', status: 'active', type: 'savings', createdAt: '2025-07-20' },
  { id: '8', accountNo: '1008', customerName: 'Kavita Nair', balance: 340000, lastTransactionDate: '2026-04-23', status: 'active', type: 'current', createdAt: '2025-08-10' },
];

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', address: 'Mumbai, Maharashtra', accountCount: 2, totalBalance: 125000, createdAt: '2025-01-15' },
  { id: '2', name: 'Priya Patel', email: 'priya@email.com', phone: '+91 87654 32109', address: 'Ahmedabad, Gujarat', accountCount: 1, totalBalance: 450000, createdAt: '2025-02-20' },
  { id: '3', name: 'Amit Kumar', email: 'amit@email.com', phone: '+91 76543 21098', address: 'Delhi, NCR', accountCount: 1, totalBalance: 78500, createdAt: '2025-03-10' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@email.com', phone: '+91 65432 10987', address: 'Bangalore, Karnataka', accountCount: 1, totalBalance: 230000, createdAt: '2025-04-05' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', address: 'Jaipur, Rajasthan', accountCount: 1, totalBalance: 15200, createdAt: '2025-05-12' },
  { id: '6', name: 'Ananya Reddy', email: 'ananya@email.com', phone: '+91 43210 98765', address: 'Hyderabad, Telangana', accountCount: 2, totalBalance: 890000, createdAt: '2025-06-01' },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', accountNo: '1001', customerName: 'Rahul Sharma', type: 'deposit', amount: 25000, balanceAfter: 125000, description: 'Salary credit', date: '2026-04-20T10:30:00', status: 'completed' },
  { id: 't2', accountNo: '1002', customerName: 'Priya Patel', type: 'withdraw', amount: 15000, balanceAfter: 450000, description: 'ATM withdrawal', date: '2026-04-22T14:15:00', status: 'completed' },
  { id: 't3', accountNo: '1003', customerName: 'Amit Kumar', type: 'deposit', amount: 10000, balanceAfter: 78500, description: 'Online transfer received', date: '2026-04-18T09:45:00', status: 'completed' },
  { id: 't4', accountNo: '1004', customerName: 'Sneha Gupta', type: 'transfer', amount: 50000, balanceAfter: 230000, description: 'Transfer to savings', date: '2026-04-25T16:20:00', status: 'completed' },
  { id: 't5', accountNo: '1006', customerName: 'Ananya Reddy', type: 'deposit', amount: 100000, balanceAfter: 890000, description: 'Business income', date: '2026-04-24T11:00:00', status: 'completed' },
  { id: 't6', accountNo: '1001', customerName: 'Rahul Sharma', type: 'withdraw', amount: 5000, balanceAfter: 100000, description: 'Bill payment', date: '2026-04-19T13:30:00', status: 'completed' },
  { id: 't7', accountNo: '1008', customerName: 'Kavita Nair', type: 'deposit', amount: 75000, balanceAfter: 340000, description: 'Fixed deposit maturity', date: '2026-04-23T15:45:00', status: 'completed' },
  { id: 't8', accountNo: '1007', customerName: 'Deepak Joshi', type: 'withdraw', amount: 8000, balanceAfter: 56000, description: 'Cash withdrawal', date: '2026-04-15T10:00:00', status: 'completed' },
  { id: 't9', accountNo: '1002', customerName: 'Priya Patel', type: 'transfer', amount: 30000, balanceAfter: 465000, description: 'EMI payment', date: '2026-04-21T12:00:00', status: 'completed' },
  { id: 't10', accountNo: '1005', customerName: 'Vikram Singh', type: 'deposit', amount: 2000, balanceAfter: 15200, description: 'Misc credit', date: '2026-03-30T08:30:00', status: 'completed' },
];

export const mockDashboardStats: DashboardStats = {
  totalAccounts: mockAccounts.length,
  totalCustomers: mockCustomers.length,
  totalBalance: mockAccounts.reduce((sum, a) => sum + a.balance, 0),
  totalTransactions: mockTransactions.length,
  recentTransactions: mockTransactions.slice(0, 5),
  monthlyData: [
    { month: 'Nov', deposits: 320000, withdrawals: 180000 },
    { month: 'Dec', deposits: 450000, withdrawals: 210000 },
    { month: 'Jan', deposits: 380000, withdrawals: 195000 },
    { month: 'Feb', deposits: 520000, withdrawals: 280000 },
    { month: 'Mar', deposits: 410000, withdrawals: 230000 },
    { month: 'Apr', deposits: 480000, withdrawals: 250000 },
  ],
};

// ================================================================
// SERVICE FUNCTIONS — These simulate API calls
// Replace internals with real Axios calls when backend is ready
// ================================================================

function delay(ms = 400): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Account Service ---
export async function getAccounts(): Promise<Account[]> {
  await delay();
  return [...mockAccounts];
}

export async function getAccountById(id: string): Promise<Account | undefined> {
  await delay(300);
  return mockAccounts.find(a => a.id === id || a.accountNo === id);
}

export async function createAccount(data: { accountNo: string; customerName: string; balance: number; type: string }): Promise<Account> {
  await delay(500);
  const newAccount: Account = {
    id: String(mockAccounts.length + 1),
    accountNo: data.accountNo,
    customerName: data.customerName,
    balance: data.balance,
    lastTransactionDate: new Date().toISOString().split('T')[0],
    status: 'active',
    type: data.type as Account['type'],
    createdAt: new Date().toISOString().split('T')[0],
  };
  mockAccounts.push(newAccount);
  return newAccount;
}

export async function deleteAccount(id: string): Promise<boolean> {
  await delay(500);
  const index = mockAccounts.findIndex(a => a.id === id);
  if (index !== -1) {
    mockAccounts.splice(index, 1);
    return true;
  }
  return false;
}

// --- Customer Service ---
export async function getCustomers(): Promise<Customer[]> {
  await delay();
  return [...mockCustomers];
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  await delay(300);
  return mockCustomers.find(c => c.id === id);
}

export async function createCustomer(data: Partial<Customer>): Promise<Customer> {
  await delay(500);
  const newCustomer: Customer = {
    id: String(mockCustomers.length + 1),
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    address: data.address || '',
    accountCount: 0,
    totalBalance: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };
  mockCustomers.push(newCustomer);
  return newCustomer;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  await delay(500);
  const index = mockCustomers.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCustomers.splice(index, 1);
    return true;
  }
  return false;
}

// --- Transaction Service ---
export async function getTransactions(): Promise<Transaction[]> {
  await delay();
  return [...mockTransactions];
}

export async function depositMoney(accountNo: string, amount: number, description: string): Promise<Transaction> {
  await delay(600);
  const account = mockAccounts.find(a => a.accountNo === accountNo);
  if (!account) throw new Error('Account not found');

  account.balance += amount;
  account.lastTransactionDate = new Date().toISOString().split('T')[0];

  const txn: Transaction = {
    id: 't' + (mockTransactions.length + 1),
    accountNo,
    customerName: account.customerName,
    type: 'deposit',
    amount,
    balanceAfter: account.balance,
    description,
    date: new Date().toISOString(),
    status: 'completed',
  };
  mockTransactions.unshift(txn);
  return txn;
}

export async function withdrawMoney(accountNo: string, amount: number, description: string): Promise<Transaction> {
  await delay(600);
  const account = mockAccounts.find(a => a.accountNo === accountNo);
  if (!account) throw new Error('Account not found');
  if (account.balance < amount) throw new Error('Insufficient balance');

  account.balance -= amount;
  account.lastTransactionDate = new Date().toISOString().split('T')[0];

  const txn: Transaction = {
    id: 't' + (mockTransactions.length + 1),
    accountNo,
    customerName: account.customerName,
    type: 'withdraw',
    amount,
    balanceAfter: account.balance,
    description,
    date: new Date().toISOString(),
    status: 'completed',
  };
  mockTransactions.unshift(txn);
  return txn;
}

export async function transferMoney(fromAccountNo: string, toAccountNo: string, amount: number, description: string): Promise<Transaction> {
  await delay(800);
  const fromAccount = mockAccounts.find(a => a.accountNo === fromAccountNo);
  const toAccount = mockAccounts.find(a => a.accountNo === toAccountNo);
  if (!fromAccount) throw new Error('Source account not found');
  if (!toAccount) throw new Error('Destination account not found');
  if (fromAccount.balance < amount) throw new Error('Insufficient balance');

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  const txn: Transaction = {
    id: 't' + (mockTransactions.length + 1),
    accountNo: fromAccountNo,
    customerName: fromAccount.customerName,
    type: 'transfer',
    amount,
    balanceAfter: fromAccount.balance,
    description: description || `Transfer to ${toAccountNo}`,
    date: new Date().toISOString(),
    status: 'completed',
  };
  mockTransactions.unshift(txn);
  return txn;
}

// --- Dashboard Service ---
export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(500);
  return {
    ...mockDashboardStats,
    totalAccounts: mockAccounts.length,
    totalCustomers: mockCustomers.length,
    totalBalance: mockAccounts.reduce((sum, a) => sum + a.balance, 0),
    totalTransactions: mockTransactions.length,
    recentTransactions: mockTransactions.slice(0, 5),
  };
}
