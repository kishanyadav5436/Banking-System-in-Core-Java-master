import { Link } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
      animation: 'fadeInUp 0.5s ease-out',
    }}>
      <div style={{
        fontSize: '6rem', fontWeight: 900, letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, var(--primary-400), var(--accent-400))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1,
      }}>404</div>
      <h2 style={{ fontSize: 'var(--font-2xl)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)', maxWidth: 400 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn-primary">
        <HiOutlineHome size={16} /> Back to Dashboard
      </Link>
    </div>
  );
}
