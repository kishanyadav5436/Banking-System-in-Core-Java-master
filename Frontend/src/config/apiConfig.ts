// API Configuration — endpoints and base URL
// Change VITE_API_BASE_URL in .env.local to point to your Spring Boot backend

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',

  // Accounts
  ACCOUNTS: '/accounts',
  ACCOUNT_BY_ID: (id: string) => `/accounts/${id}`,

  // Customers
  CUSTOMERS: '/customers',
  CUSTOMER_BY_ID: (id: string) => `/customers/${id}`,

  // Transactions
  TRANSACTIONS: '/transactions',
  DEPOSIT: '/transactions/deposit',
  WITHDRAW: '/transactions/withdraw',
  TRANSFER: '/transactions/transfer',
  TRANSACTION_HISTORY: (accountId: string) => `/transactions/history/${accountId}`,
} as const;
