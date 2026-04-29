import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineCash,
  HiOutlineSwitchHorizontal,
  HiOutlineTrendingUp,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlinePlusSm,
} from 'react-icons/hi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { getDashboardStats } from '../../services/api';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import Loader from '../Loading/Loader';
import type { DashboardStats } from '../../types';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading || !stats) return <Loader />;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your banking overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats stagger-children">
        <div className="glass-card stat-card animate-fade-in-up">
          <div className="stat-card-header">
            <div className="stat-card-icon purple"><HiOutlineCreditCard /></div>
            <span className="stat-card-change up"><HiOutlineTrendingUp /> +12%</span>
          </div>
          <div className="stat-card-value">{stats.totalAccounts}</div>
          <div className="stat-card-label">Total Accounts</div>
        </div>

        <div className="glass-card stat-card animate-fade-in-up">
          <div className="stat-card-header">
            <div className="stat-card-icon green"><HiOutlineUsers /></div>
            <span className="stat-card-change up"><HiOutlineTrendingUp /> +8%</span>
          </div>
          <div className="stat-card-value">{stats.totalCustomers}</div>
          <div className="stat-card-label">Total Customers</div>
        </div>

        <div className="glass-card stat-card animate-fade-in-up">
          <div className="stat-card-header">
            <div className="stat-card-icon blue"><HiOutlineCash /></div>
            <span className="stat-card-change up"><HiOutlineTrendingUp /> +15%</span>
          </div>
          <div className="stat-card-value">{formatCurrency(stats.totalBalance)}</div>
          <div className="stat-card-label">Total Balance</div>
        </div>

        <div className="glass-card stat-card animate-fade-in-up">
          <div className="stat-card-header">
            <div className="stat-card-icon orange"><HiOutlineSwitchHorizontal /></div>
            <span className="stat-card-change up"><HiOutlineTrendingUp /> +22%</span>
          </div>
          <div className="stat-card-value">{stats.totalTransactions}</div>
          <div className="stat-card-label">Transactions</div>
        </div>
      </div>

      {/* Chart + Quick Actions */}
      <div className="dashboard-grid">
        <div className="glass-card dashboard-chart-card animate-fade-in-up">
          <h3>Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
                  borderRadius: '12px', color: 'var(--text-primary)', fontSize: '13px',
                }}
                formatter={(value) => [formatCurrency(Number(value))]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-tertiary)' }} />
              <Bar dataKey="deposits" fill="var(--primary-500)" radius={[6, 6, 0, 0]} name="Deposits" />
              <Bar dataKey="withdrawals" fill="var(--danger-500)" radius={[6, 6, 0, 0]} name="Withdrawals" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card quick-actions-card animate-fade-in-up">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={() => navigate('/transactions?tab=deposit')}>
              <div className="qa-icon deposit"><HiOutlineArrowDown /></div>
              Deposit
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/transactions?tab=withdraw')}>
              <div className="qa-icon withdraw"><HiOutlineArrowUp /></div>
              Withdraw
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/transactions?tab=transfer')}>
              <div className="qa-icon transfer"><HiOutlineSwitchHorizontal /></div>
              Transfer
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/accounts?action=new')}>
              <div className="qa-icon account"><HiOutlinePlusSm /></div>
              New Account
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card recent-txn-card animate-fade-in-up">
        <h3>Recent Transactions</h3>
        {stats.recentTransactions.map((txn) => (
          <div className="recent-txn-item" key={txn.id}>
            <div className={`recent-txn-icon ${txn.type}`}>
              {txn.type === 'deposit' && <HiOutlineArrowDown />}
              {txn.type === 'withdraw' && <HiOutlineArrowUp />}
              {txn.type === 'transfer' && <HiOutlineSwitchHorizontal />}
            </div>
            <div className="recent-txn-info">
              <h4>{txn.customerName}</h4>
              <span>{txn.description} • {formatDateTime(txn.date)}</span>
            </div>
            <div className={`recent-txn-amount ${txn.type === 'deposit' ? 'credit' : 'debit'}`}>
              {txn.type === 'deposit' ? '+' : '-'}{formatCurrency(txn.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
