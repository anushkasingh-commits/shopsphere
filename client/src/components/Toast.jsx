import { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: '#1a1a1a',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      zIndex: 1000,
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      {message}
    </div>
  );
}