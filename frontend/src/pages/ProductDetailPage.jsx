import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductWithDetails, getAllProductsWithDetails, discount } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id }       = useParams();
  const product      = getProductWithDetails(Number(id));
  const { addItem, isInCart, getQty, updateQty } = useCart();
  const navigate      = useNavigate();

  if (!product) return (
    <div className="container empty-state" style={{ paddingTop:'5rem' }}>
      <div className="empty-icon">😕</div>
      <h3>Product not found</h3>
      <Link to="/products" className="btn btn-primary">Browse Products</Link>
    </div>
  );

  const { price, stock } = product;
  const inCart   = isInCart(product.product_id);
  const qty      = getQty(product.product_id);
  const disc     = discount(price.mrp, price.selling_price);
  const inStock  = stock?.quantity > 0;
  const gstAmt   = ((price.selling_price * price.gst_percent) / 100).toFixed(2);
  const finalPri = (parseFloat(price.selling_price) + parseFloat(gstAmt)).toFixed(2);

  const similar  = getAllProductsWithDetails()
    .filter(p => p.category_id === product.category_id && p.product_id !== product.product_id)
    .slice(0, 4);

  return (
    <div className="pdp page-enter">
      <div className="container">
        <div className="breadcrumb" style={{ marginBottom:'1.5rem' }}>
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span className="active">{product.name}</span>
        </div>

        <div className="pdp-grid">
          {/* Image */}
          <div className="pdp-image-col">
            <div className="pdp-image-wrap card">
              <img src={product.image_url} alt={product.name} />
              {disc > 0 && <span className="pdp-disc-badge">{disc}% OFF</span>}
            </div>
            <div className="pdp-thumbnails">
              <div className="pdp-thumb active">
                <img src={product.image_url} alt={product.name} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pdp-info">
            <span className="badge badge-green">{inStock ? `✅ In Stock (${stock.quantity} left)` : '❌ Out of Stock'}</span>
            <h1 className="pdp-name">{product.name}</h1>
            <p className="pdp-brand">by <strong>{product.brand}</strong> · {product.unit}</p>
            <div className="pdp-stars"><span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span> <span className="pdp-rating-val">{product.rating}/5</span></div>
            <p className="pdp-desc">{product.description}</p>

            {/* Price breakdown */}
            <div className="pdp-price-box card">
              <h4 style={{marginBottom:'0.75rem', color:'var(--gray-700)'}}>Price Breakdown</h4>
              <div className="pdp-price-row"><span>MRP</span><span className="price-mrp" style={{textDecoration:'none', color:'var(--gray-600)'}}>₹{price.mrp}</span></div>
              <div className="pdp-price-row"><span>Selling Price</span><span style={{fontWeight:700}}>₹{price.selling_price}</span></div>
              {price.gst_percent > 0 && (
                <div className="pdp-price-row"><span>GST ({price.gst_percent}%)</span><span>₹{gstAmt}</span></div>
              )}
              <div className="divider" style={{margin:'0.5rem 0'}} />
              <div className="pdp-price-row final">
                <span>You Pay</span>
                <span className="price-sell" style={{fontSize:'1.3rem'}}>₹{finalPri}</span>
              </div>
              {disc > 0 && (
                <p className="pdp-savings">🎉 You save ₹{(price.mrp - price.selling_price).toFixed(2)} ({disc}% off MRP)</p>
              )}
            </div>

            {/* Actions */}
            <div className="pdp-actions">
              {inStock ? (
                inCart ? (
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                    <div className="qty-control" style={{transform:'scale(1.2)'}}>
                      <button className="qty-btn" onClick={() => updateQty(product.product_id, qty - 1)}>−</button>
                      <span className="qty-value">{qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(product.product_id, qty + 1)}>+</button>
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/cart')}>
                      🛒 Go to Cart
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary btn-lg" onClick={() => addItem(product)}>
                    🛒 Add to Cart
                  </button>
                )
              ) : (
                <button className="btn btn-outline btn-lg" disabled>Out of Stock</button>
              )}
              <Link to="/products" className="btn btn-ghost btn-lg">← Continue Shopping</Link>
            </div>

            {/* Delivery info */}
            <div className="pdp-delivery card">
              <div className="pdp-del-row"><span>🚚</span><div><strong>Free Delivery</strong><p>On orders above ₹299</p></div></div>
              <div className="pdp-del-row"><span>↩️</span><div><strong>Easy Return</strong><p>7-day hassle-free return</p></div></div>
              <div className="pdp-del-row"><span>✅</span><div><strong>Quality Guaranteed</strong><p>100% fresh & authentic</p></div></div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Similar <span>Products</span></h2>
            </div>
            <div className="pdp-similar-grid">
              {similar.map(p => <ProductCard key={p.product_id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
