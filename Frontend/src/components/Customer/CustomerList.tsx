import { useEffect, useState } from 'react';
import { HiOutlinePlusSm, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';
import { getCustomers, createCustomer, deleteCustomer } from '../../services/api';
import { formatDate } from '../../utils/formatters';
import Loader from '../Loading/Loader';
import type { Customer } from '../../types';
import './CustomerList.css';

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => { loadCustomers(); }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(''); setFormSuccess('');
    if (!name) { setFormError('Name is required'); return; }
    try {
      await createCustomer({ name, email, phone, address });
      setFormSuccess('Customer added!');
      setName(''); setEmail(''); setPhone(''); setAddress('');
      await loadCustomers();
      setTimeout(() => { setShowForm(false); setFormSuccess(''); }, 1200);
    } catch { setFormError('Failed to add customer'); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this customer?')) {
      await deleteCustomer(id);
      await loadCustomers();
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  if (showForm) {
    return (
      <div className="animate-fade-in">
        <div className="page-header"><h1>Add Customer</h1></div>
        <div className="glass-card customer-form-card">
          <h2>Customer Details</h2>
          {formError && <div className="alert alert-error">{formError}</div>}
          {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="input-label">Full Name</label>
              <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="input-label">Email</label>
                <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div className="form-group">
                <label className="input-label">Phone</label>
                <input className="input-field" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
              </div>
            </div>
            <div className="form-group">
              <label className="input-label">Address</label>
              <input className="input-field" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Add Customer</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="customer-list-header">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Customers</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>{customers.length} registered customers</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <HiOutlineSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input-field" style={{ paddingLeft: 36, width: 220 }} placeholder="Search customers…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            <HiOutlinePlusSm size={18} /> Add Customer
          </button>
        </div>
      </div>

      <div className="table-container animate-fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Joined</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>{formatDate(c.createdAt)}</td>
                <td>
                  <button className="btn-danger" onClick={() => handleDelete(c.id)}
                    style={{ padding: '4px 10px', fontSize: '11px' }}>
                    <HiOutlineTrash size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
