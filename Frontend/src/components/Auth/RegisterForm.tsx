import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { RiBankLine } from 'react-icons/ri';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import './LoginForm.css'; /* Reuses same styles */

export default function RegisterForm() {
  const { register, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) { setError('Username is required'); return; }
    if (!email.trim()) { setError('Email is required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }

    const success = await register(username, email, password);
    if (!success) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">
            <RiBankLine />
          </div>
          <h1>Create Account</h1>
          <p>Join BankSystem today</p>
        </div>

        {error && (
          <div className="alert alert-error animate-fade-in">{error}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label className="input-label" htmlFor="reg-username">
              <HiOutlineUser style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Username
            </label>
            <input type="text" id="reg-username" className="input-field" placeholder="Choose a username"
              value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="reg-email">
              <HiOutlineMail style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Email
            </label>
            <input type="email" id="reg-email" className="input-field" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="reg-password">
              <HiOutlineLockClosed style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Password
            </label>
            <input type="password" id="reg-password" className="input-field" placeholder="Create a password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="reg-confirm-password">
              <HiOutlineLockClosed style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Confirm Password
            </label>
            <input type="password" id="reg-confirm-password" className="input-field" placeholder="Confirm your password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn-primary login-submit-btn" disabled={isLoading} id="register-submit">
            {isLoading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div className="login-divider">or</div>

        <div className="login-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
