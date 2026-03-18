import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🛒 Fresh<span>Mart</span></div>
          <p>Your daily grocery delivered fresh, fast, and at the best price.</p>
          <div className="footer-badges">
            <span>🔒 Secure Payments</span>
            <span>🚚 Fast Delivery</span>
            <span>✅ Quality Assured</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop By Category</h4>
          <ul>
            {categories.map(c => (
              <li key={c.category_id}>
                <Link to={`/products?category=${c.category_id}`}>
                  {c.icon} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>My Account</h4>
          <ul>
            <li><Link to="/dashboard">Profile</Link></li>
            <li><Link to="/dashboard">Order History</Link></li>
            <li><Link to="/dashboard">Saved Addresses</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li>📞 1800-123-4567</li>
            <li>✉️ support@freshmart.in</li>
            <li>⏰ Mon–Sat: 9AM – 6PM</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 FreshMart. All rights reserved. Built with ❤️ in India.</p>
      </div>
    </footer>
  );
}
