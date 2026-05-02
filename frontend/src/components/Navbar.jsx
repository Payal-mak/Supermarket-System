import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/mockData';
import logo from '../assets/radhika-logo.png';
import './Navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Radhika Raj Enterprise" className="logo-img" />
          <span className="logo-text">Radhika<span> Mall</span></span>
        </Link>

        {/* Desktop Search */}
        <form className="navbar-search hide-mobile" onSubmit={handleSearch}>
          <input
            className="form-input search-input"
            type="text"
            placeholder="Search for products, brands and more…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        {/* Desktop Nav */}
        <nav className="navbar-nav hide-mobile">
          <div
            className="nav-categories-wrapper"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="nav-cat-btn">Categories ▾</button>
            {showCategories && (
              <div className="categories-dropdown">
                {categories.map(cat => (
                  <Link
                    key={cat.category_id}
                    to={`/products?category=${cat.category_id}`}
                    className="cat-item"
                    onClick={() => setShowCategories(false)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/dashboard" className="nav-link">
            {user ? `👤 ${user.first_name}` : 'My Account'}
          </Link>

          {isAdmin && (
            <Link to="/admin" className="nav-link nav-admin">⚙️ Panel</Link>
          )}

          <Link to="/cart" className="cart-btn">
            <span>🛒</span>
            <span>Cart</span>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          <button className="btn btn-ghost btn-sm nav-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Mobile: cart + hamburger */}
        <div className="mobile-actions hide-desktop">
          <Link to="/cart" className="cart-btn-mobile">
            🛒
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search container hide-desktop">
        <form className="mobile-search-form" onSubmit={handleSearch}>
          <input
            className="form-input search-input"
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn mobile-search-btn">🔍</button>
        </form>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="container">
            {user && (
              <div className="mobile-user-info">
                <span className="mobile-user-avatar">{user.first_name?.[0]}{user.last_name?.[0]}</span>
                <div>
                  <strong>{user.first_name} {user.last_name}</strong>
                  <p>{user.role === 'admin' ? '⚙️ Admin' : '🛍️ Customer'}</p>
                </div>
              </div>
            )}
            <div className="divider" />
            <p className="mobile-menu-label">Categories</p>
            {categories.map(cat => (
              <Link
                key={cat.category_id}
                to={`/products?category=${cat.category_id}`}
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
            <div className="divider" />
            <Link to="/dashboard" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>👤 My Account</Link>
            {isAdmin && (
              <Link to="/admin" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>⚙️ Admin Panel</Link>
            )}
            <button className="mobile-menu-link mobile-logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
