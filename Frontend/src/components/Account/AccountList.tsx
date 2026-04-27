import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlinePlusSm, HiOutlineTrash } from 'react-icons/hi';
import { getAccounts, createAccount, deleteAccount } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Loader from '../Loading/Loader';
import type { Account } from '../../types';
import './AccountList.css';

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchParams] = useSearchParams();

  // Form state
  const [accountNo, setAccountNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [balance, setBalance] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    loadAccounts();
    if (searchParams.get('action') === 'new') setShowForm(true);
  }, [searchParams]);

  const loadAccounts = async () => {
    setLoading(true);
    const data = await getAccounts();
    setAccounts(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!accountNo || !customerName || !balance) {
      setFormError('All fields are required');
      return;
    }

    try {
      await createAccount({
        accountNo,
        customerName,
        balance: parseFloat(balance),
        type: accountType,
      });
      setFormSuccess('Account created successfully!');
      setAccountNo('');
      setCustomerName('');
      setBalance('');
      await loadAccounts();
      setTimeout(() => { setShowForm(false); setFormSuccess(''); }, 1500);
    } catch {
      setFormError('Failed to create account');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this account?')) {
      await deleteAccount(id);
      await loadAccounts();
    }
  };

  if (loading) return <Loader />;

  if (showForm) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Create New Account</h1>
          <p>Open a new bank account for a customer.</p>
        </div>
        <div className="glass-card create-account-card">
          <h2>Account Details</h2>
          {formError && <div className="alert alert-error">{formError}</div>}
          {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
          <form onSubmit={handleCreate} id="create-account-form">
            <div className="form-group">
              <label className="input-label" htmlFor="acc-no">Account Number</label>
              <input type="text" id="acc-no" className="input-field" placeholder="e.g., 1009"
                value={accountNo} onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, ''))} />
            </div>
            <div className="form-group">
              <label className="input-label" htmlFor="acc-name">Customer Name</label>
              <input type="text" id="acc-name" className="input-field" placeholder="Full name"
                value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="input-label" htmlFor="acc-type">Account Type</label>
                <select id="acc-type" className="select-field" value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="fixed">Fixed Deposit</option>
                </select>
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="acc-balance">Initial Deposit (₹)</label>
                <input type="number" id="acc-balance" className="input-field" placeholder="0.00"
                  value={balance} onChange={(e) => setBalance(e.target.value)} min="0" />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="account-list-header">
        <div>
          <h1>Accounts</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
            Manage all bank accounts • {accounts.length} total
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)} id="btn-new-account">
          <HiOutlinePlusSm size={18} /> New Account
        </button>
      </div>

      <div className="account-cards stagger-children">
        {accounts.map((account) => (
          <div className="glass-card account-card animate-fade-in-up" key={account.id}>
            <div className="account-card-top">
              <span className={`account-card-type ${account.type}`}>{account.type}</span>
              <span className="account-card-no">#{account.accountNo}</span>
            </div>
            <div className="account-card-name">{account.customerName}</div>
            <div className="account-card-date">
              Last txn: {formatDate(account.lastTransactionDate)} •{' '}
              <span className={`badge badge-${account.status === 'active' ? 'success' : 'warning'}`}>
                {account.status}
              </span>
            </div>
            <div className="account-card-balance-row">
              <div>
                <div className="account-card-balance-label">Balance</div>
                <div className="account-card-balance">{formatCurrency(account.balance)}</div>
              </div>
              <button className="btn-danger" onClick={() => handleDelete(account.id)}
                style={{ padding: '6px 12px', fontSize: '12px' }} title="Delete account">
                <HiOutlineTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
