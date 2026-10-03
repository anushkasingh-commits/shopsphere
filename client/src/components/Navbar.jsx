import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        Shop<span>Sphere</span>
      </Link>
      <nav className="nav-links">
        <button className="btn btn-ghost" onClick={() => setDark(d => !d)}>
          {dark ? '☀️' : '🌙'}
        </button>
        <NavLink to="/">Shop</NavLink>
        <NavLink to="/cart">Cart ({totalItems})</NavLink>
        {user && <NavLink to="/orders">My Orders</NavLink>}
        {isAdmin && <NavLink to="/admin/products">Admin</NavLink>}
        {user ? (
          <>
            <span className="muted">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="btn">Login</NavLink>
        )}
      </nav>
    </header>
  );
}
