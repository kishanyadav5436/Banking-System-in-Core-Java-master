// Shared type definitions for the Banking System

export interface Account {
  id: string;
  accountNo: string;
  customerName: string;
  balance: number;
  lastTransactionDate: string;
  status: 'active' | 'inactive' | 'closed';
  type: 'savings' | 'current' | 'fixed';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  accountCount: number;
  totalBalance: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  accountNo: string;
  customerName: string;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  balanceAfter: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardStats {
  totalAccounts: number;
  totalCustomers: number;
  totalBalance: number;
  totalTransactions: number;
  recentTransactions: Transaction[];
  monthlyData: { month: string; deposits: number; withdrawals: number }[];
}
