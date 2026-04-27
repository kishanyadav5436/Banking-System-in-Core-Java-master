import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { RiBankLine } from 'react-icons/ri';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import './LoginForm.css';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">
            <RiBankLine />
          </div>
          <h1>BankSystem</h1>
          <p>Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-error animate-fade-in">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="input-label" htmlFor="login-username">
              <HiOutlineMail style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Username
            </label>
            <input
              type="text"
              id="login-username"
              className="input-field"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="input-label" htmlFor="login-password">
              <HiOutlineLockClosed style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-primary login-submit-btn"
            disabled={isLoading}
            id="login-submit"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="login-divider">or</div>

        <div className="login-footer">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}
