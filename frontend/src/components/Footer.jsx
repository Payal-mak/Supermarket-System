import { Link } from 'react-router-dom';
import { categories, storeInfo } from '../data/mockData';
import logo from '../assets/radhika-logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Radhika Raj Enterprise" className="footer-logo-img" />
            <div>
              <div className="footer-logo-text">{storeInfo.name}</div>
              <div className="footer-subbrand">{storeInfo.subBrand}</div>
            </div>
          </div>
          <p>{storeInfo.address}</p>
          <div className="footer-badges">
            <span>🛍️ Quality Products</span>
            <span>💰 Best Prices</span>
            <span>🤝 Trusted Since Years</span>
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
            {storeInfo.owners.map((owner, i) => (
              <li key={i}>📞 {owner.name} — Mo. {owner.phone}</li>
            ))}
            <li>📍 {storeInfo.address}</li>
            <li>⏰ Mon–Sat: 9AM – 9PM</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 {storeInfo.name} ({storeInfo.subBrand}). All rights reserved. Made with ❤️ in Gondal, Gujarat.</p>
      </div>
    </footer>
  );
}
