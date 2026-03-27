import { Link } from 'react-router-dom';
import { getAllProductsWithDetails, categories, storeInfo } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const offers = [
  { id: 1, title: 'Grand Opening Offer!', sub: 'Flat 20% off on Cosmetics & Gift Articles', bg: 'linear-gradient(135deg, #B91F3F 0%, #8C4074 100%)', emoji: '🎉' },
  { id: 2, title: 'Bakery Fresh Daily', sub: 'Bread, biscuits & cakes — fresh from the oven', bg: 'linear-gradient(135deg, #F2923B 0%, #F6C817 100%)', emoji: '🍞' },
  { id: 3, title: 'Household Essentials', sub: 'Stock up on cleaning & home care at best prices', bg: 'linear-gradient(135deg, #165F47 0%, #2DA049 100%)', emoji: '🏠' },
];

export default function HomePage() {
  const allProducts = getAllProductsWithDetails();
  const featured = allProducts.filter(p => p.price.mrp > p.price.selling_price).slice(0, 8);

  return (
    <div className="home page-enter">

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-pill">🛍️ {storeInfo.subBrand}</span>
            <h1>Welcome to <span>Radhika Shopping Mall</span></h1>
            <p>Your one-stop family shop in Gondal! Cosmetics, Bakery, Grocery, Hosiery, Stationary, Gifts, Household Products, Plastic Ware & Cold Drinks — all under one roof.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">Shop Now →</Link>
              <Link to="/products?category=3" className="btn btn-secondary btn-lg">Grocery 🛒</Link>
            </div>
            <div className="hero-stats">
              <div><strong>9</strong><span>Categories</span></div>
              <div><strong>100+</strong><span>Products</span></div>
              <div><strong>Gondal</strong><span>Gujarat</span></div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-floating-card card-1">🛍️ Quality Products</div>
            <div className="hero-floating-card card-2">💰 Best Prices</div>
            <div className="hero-visual">
              <div className="hero-visual-inner">🏪</div>
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
            { icon: '💰', title: 'Best Prices Guaranteed', sub: 'Wholesale rates for families' },
            { icon: '🛍️', title: 'All Under One Roof', sub: '9 categories, 100+ products' },
            { icon: '🤝', title: 'Trusted by Gondal', sub: 'Family-run since generations' },
            { icon: '✅', title: 'Quality Products', sub: 'Only branded & verified items' },
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
