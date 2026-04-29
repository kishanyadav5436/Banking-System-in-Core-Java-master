import axios from 'axios';
import type { Account, Customer, Transaction, DashboardStats } from '../types';

// ================================================================
// API CONFIGURATION
// ================================================================

// Use the proxy defined in package.json or environment variable
let API_URL = import.meta.env.VITE_API_URL || '/api';
if (API_URL && API_URL.startsWith('http') && !API_URL.endsWith('/api')) {
  API_URL = API_URL.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================================================================
// SERVICE FUNCTIONS — Connected to Spring Boot Backend
// ================================================================

// --- Account Service ---
export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('/accounts');
  return response.data;
}

export async function getAccountById(id: string): Promise<Account | undefined> {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
}

export async function createAccount(data: { accountNo: string; customerName: string; balance: number; type: string }): Promise<Account> {
  const response = await api.post('/accounts', data);
  return response.data;
}

export async function deleteAccount(id: string): Promise<boolean> {
  try {
    await api.delete(`/accounts/${id}`);
    return true;
  } catch (error) {
    return false;
  }
}

// --- Customer Service ---
export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get('/customers');
  return response.data;
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    return undefined;
  }
}

export async function createCustomer(data: Partial<Customer>): Promise<Customer> {
  const response = await api.post('/customers', data);
  return response.data;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  try {
    await api.delete(`/customers/${id}`);
    return true;
  } catch (error) {
    return false;
  }
}

// --- Transaction Service ---
export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get('/transactions');
  return response.data;
}

export async function depositMoney(accountNo: string, amount: number, description: string): Promise<Transaction> {
  const response = await api.post('/transactions/deposit', { accountNo, amount, description });
  return response.data;
}

export async function withdrawMoney(accountNo: string, amount: number, description: string): Promise<Transaction> {
  const response = await api.post('/transactions/withdraw', { accountNo, amount, description });
  return response.data;
}

export async function transferMoney(fromAccountNo: string, toAccountNo: string, amount: number, description: string): Promise<Transaction> {
  const response = await api.post('/transactions/transfer', { fromAccountNo, toAccountNo, amount, description });
  return response.data;
}

// --- Dashboard Service ---
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get('/dashboard/stats');
  return response.data;
}
