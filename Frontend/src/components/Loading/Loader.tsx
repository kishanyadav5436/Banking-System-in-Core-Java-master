import './Loader.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullscreen?: boolean;
  text?: string;
}

export default function Loader({ size = 'md', fullscreen = false, text }: LoaderProps) {
  if (fullscreen) {
    return (
      <div className="loader-fullscreen">
        <div className={`loader-spinner ${size}`} />
        {text && <span className="loader-text">{text}</span>}
      </div>
    );
  }

  return (
    <div className="loader-overlay">
      <div className={`loader-spinner ${size}`} />
    </div>
  );
}
