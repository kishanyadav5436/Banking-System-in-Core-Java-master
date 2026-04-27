import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  HiOutlineArrowDown, HiOutlineArrowUp,
  HiOutlineSwitchHorizontal,
} from 'react-icons/hi';
import {
  getTransactions, depositMoney, withdrawMoney, transferMoney,
} from '../../services/api';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import Loader from '../Loading/Loader';
import type { Transaction } from '../../types';
import './TransactionList.css';

type Tab = 'history' | 'deposit' | 'withdraw' | 'transfer';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('history');

  // Form states
  const [accountNo, setAccountNo] = useState('');
  const [toAccountNo, setToAccountNo] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTransactions();
    const tab = searchParams.get('tab');
    if (tab && ['deposit', 'withdraw', 'transfer'].includes(tab)) {
      setActiveTab(tab as Tab);
    }
  }, [searchParams]);

  const loadTransactions = async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  const resetForm = () => {
    setAccountNo('');
    setToAccountNo('');
    setAmount('');
    setDescription('');
    setFormError('');
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(''); setFormSuccess('');
    if (!accountNo || !amount) { setFormError('Account No and Amount are required'); return; }
    setSubmitting(true);
    try {
      await depositMoney(accountNo, parseFloat(amount), description || 'Deposit');
      setFormSuccess('Deposit successful!');
      resetForm();
      await loadTransactions();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Deposit failed');
    }
    setSubmitting(false);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(''); setFormSuccess('');
    if (!accountNo || !amount) { setFormError('Account No and Amount are required'); return; }
    setSubmitting(true);
    try {
      await withdrawMoney(accountNo, parseFloat(amount), description || 'Withdrawal');
      setFormSuccess('Withdrawal successful!');
      resetForm();
      await loadTransactions();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Withdrawal failed');
    }
    setSubmitting(false);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(''); setFormSuccess('');
    if (!accountNo || !toAccountNo || !amount) { setFormError('All fields are required'); return; }
    if (accountNo === toAccountNo) { setFormError('Source and destination must be different'); return; }
    setSubmitting(true);
    try {
      await transferMoney(accountNo, toAccountNo, parseFloat(amount), description || 'Transfer');
      setFormSuccess('Transfer successful!');
      resetForm();
      await loadTransactions();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Transfer failed');
    }
    setSubmitting(false);
  };

  if (loading) return <Loader />;

  const renderForm = () => {
    const configs = {
      deposit: { title: 'Deposit Money', desc: 'Add funds to an account', icon: <HiOutlineArrowDown />, handler: handleDeposit, btnClass: 'btn-success', btnText: 'Deposit' },
      withdraw: { title: 'Withdraw Money', desc: 'Withdraw funds from an account', icon: <HiOutlineArrowUp />, handler: handleWithdraw, btnClass: 'btn-danger', btnText: 'Withdraw' },
      transfer: { title: 'Transfer Money', desc: 'Transfer between accounts', icon: <HiOutlineSwitchHorizontal />, handler: handleTransfer, btnClass: 'btn-primary', btnText: 'Transfer' },
    };

    const cfg = configs[activeTab as keyof typeof configs];
    if (!cfg) return null;

    return (
      <div className="glass-card txn-form-card" key={activeTab}>
        <h2>{cfg.icon} {cfg.title}</h2>
        <p>{cfg.desc}</p>
        {formError && <div className="alert alert-error">{formError}</div>}
        {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
        <form onSubmit={cfg.handler}>
          <div className="form-group">
            <label className="input-label" htmlFor="txn-acc">Account Number</label>
            <input type="text" id="txn-acc" className="input-field" placeholder="e.g., 1001"
              value={accountNo} onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, ''))} />
          </div>
          {activeTab === 'transfer' && (
            <div className="form-group">
              <label className="input-label" htmlFor="txn-to-acc">To Account Number</label>
              <input type="text" id="txn-to-acc" className="input-field" placeholder="e.g., 1002"
                value={toAccountNo} onChange={(e) => setToAccountNo(e.target.value.replace(/\D/g, ''))} />
            </div>
          )}
          <div className="form-group">
            <label className="input-label" htmlFor="txn-amount">Amount (₹)</label>
            <input type="number" id="txn-amount" className="input-field" placeholder="0.00"
              value={amount} onChange={(e) => setAmount(e.target.value)} min="1" />
          </div>
          <div className="form-group">
            <label className="input-label" htmlFor="txn-desc">Description (optional)</label>
            <input type="text" id="txn-desc" className="input-field" placeholder="Payment description"
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => { resetForm(); setActiveTab('history'); }}>Cancel</button>
            <button type="submit" className={cfg.btnClass} disabled={submitting}>
              {submitting ? 'Processing…' : cfg.btnText}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Transactions</h1>
        <p>Manage deposits, withdrawals, and transfers.</p>
      </div>

      <div className="txn-page-tabs">
        {(['history', 'deposit', 'withdraw', 'transfer'] as Tab[]).map((tab) => (
          <button key={tab} className={`txn-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); resetForm(); setFormSuccess(''); }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab !== 'history' ? renderForm() : (
        <div className="table-container animate-fade-in-up">
          <table className="data-table" id="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{formatDateTime(txn.date)}</td>
                  <td style={{ fontFamily: 'monospace' }}>#{txn.accountNo}</td>
                  <td>{txn.customerName}</td>
                  <td>
                    <span className={`badge badge-${txn.type === 'deposit' ? 'success' : txn.type === 'withdraw' ? 'danger' : 'info'}`}>
                      {txn.type === 'deposit' && <HiOutlineArrowDown size={12} />}
                      {txn.type === 'withdraw' && <HiOutlineArrowUp size={12} />}
                      {txn.type === 'transfer' && <HiOutlineSwitchHorizontal size={12} />}
                      {txn.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: txn.type === 'deposit' ? 'var(--accent-400)' : 'var(--danger-400)' }}>
                    {txn.type === 'deposit' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </td>
                  <td>{formatCurrency(txn.balanceAfter)}</td>
                  <td><span className="badge badge-success">{txn.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
