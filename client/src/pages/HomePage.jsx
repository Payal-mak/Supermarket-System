import { Link } from 'react-router-dom';
import { getAllProductsWithDetails, categories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const offers = [
  { id: 1, title: '50% OFF on First Order', sub: 'Use code FRESH50 at checkout', bg: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', emoji: '🎉' },
  { id: 2, title: 'Free Delivery on ₹299+', sub: 'Shop more, save more on every order', bg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', emoji: '🚚' },
  { id: 3, title: 'Fresh Vegetables Daily', sub: 'Farm to door in under 2 hours', bg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', emoji: '🥦' },
];

export default function HomePage() {
  const allProducts = getAllProductsWithDetails();
  const featured    = allProducts.filter(p => p.price.mrp > p.price.selling_price).slice(0, 8);

  return (
    <div className="home page-enter">

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-pill">🛒 India's Freshest Online Supermarket</span>
            <h1>Groceries delivered <span>fresh</span> to your door</h1>
            <p>Shop from 500+ products. Daily fresh produce, dairy, snacks and more — delivered in under 2 hours.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">Shop Now →</Link>
              <Link to="/products?category=1" className="btn btn-outline btn-lg">Fresh Veggies 🥦</Link>
            </div>
            <div className="hero-stats">
              <div><strong>10K+</strong><span>Happy Customers</span></div>
              <div><strong>500+</strong><span>Products</span></div>
              <div><strong>2 hrs</strong><span>Delivery</span></div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-floating-card card-1">🥦 Fresh Daily</div>
            <div className="hero-floating-card card-2">🚚 Free Delivery</div>
            <div className="hero-visual">
              <div className="hero-visual-inner">🛒</div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS BANNER */}
      <section className="offers-section container section">
        <div className="section-header">
          <h2 className="section-title">🔥 Best <span>Deals</span></h2>
        </div>
        <div className="offers-grid">
          {offers.map(o => (
            <div key={o.id} className="offer-card" style={{ background: o.bg }}>
              <div className="offer-emoji">{o.emoji}</div>
              <div>
                <h3>{o.title}</h3>
                <p>{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container section">
        <div className="section-header">
          <h2 className="section-title">Shop by <span>Category</span></h2>
          <Link to="/products" className="btn btn-ghost btn-sm">View All →</Link>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link
              key={cat.category_id}
              to={`/products?category=${cat.category_id}`}
              className="category-chip card"
              style={{ '--cat-color': cat.color }}
            >
              <span className="cat-chip-icon">{cat.icon}</span>
              <span className="cat-chip-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container section">
        <div className="section-header">
          <h2 className="section-title">🌟 Featured <span>Products</span></h2>
          <Link to="/products" className="btn btn-ghost btn-sm">See All →</Link>
        </div>
        <div className="products-grid">
          {featured.map(p => (
            <ProductCard key={p.product_id} product={p} />
          ))}
        </div>
      </section>

      {/* ALL PRODUCTS SECTION */}
      <section className="container section">
        <div className="section-header">
          <h2 className="section-title">All <span>Products</span></h2>
          <Link to="/products" className="btn btn-ghost btn-sm">Browse All →</Link>
        </div>
        <div className="products-grid">
          {allProducts.slice(0, 4).map(p => (
            <ProductCard key={p.product_id} product={p} />
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container trust-inner">
          {[
            { icon: '🔒', title: '100% Secure Payment', sub: 'Multiple payment modes' },
            { icon: '🚚', title: 'Fast Delivery',        sub: 'Order before 6PM, get today' },
            { icon: '↩️', title: 'Easy Returns',         sub: '7-day hassle-free return' },
            { icon: '✅', title: 'Quality Assured',       sub: 'Freshness guaranteed' },
          ].map((t, i) => (
            <div key={i} className="trust-item">
              <span className="trust-icon">{t.icon}</span>
              <div><strong>{t.title}</strong><p>{t.sub}</p></div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
