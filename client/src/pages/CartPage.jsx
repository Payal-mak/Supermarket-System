import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { items, itemCount, subtotal, gstAmount, total, savings, removeItem, updateQty } = useCart();
  const navigate = useNavigate();

  if (itemCount === 0) {
    return (
      <div className="container">
        <div className="empty-state" style={{ paddingTop: '5rem' }}>
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty!</h3>
          <p>Add some fresh products to get started.</p>
          <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <h1 className="cart-title">My Cart <span className="badge badge-green">{itemCount} items</span></h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {savings > 0 && (
              <div className="savings-bar">
                🎉 You are saving <strong>₹{savings.toFixed(2)}</strong> on this order!
              </div>
            )}

            {items.map(item => (
              <div key={item.product_id} className="cart-item card">
                <img src={item.image_url} alt={item.name} className="ci-image" />
                <div className="ci-info">
                  <p className="ci-brand">{item.brand}</p>
                  <h4 className="ci-name">{item.name}</h4>
                  <p className="ci-unit">{item.unit}</p>
                  <div className="price-row">
                    <span className="price-sell">₹{item.price.selling_price}</span>
                    {item.price.mrp > item.price.selling_price && (
                      <span className="price-mrp">₹{item.price.mrp}</span>
                    )}
                  </div>
                </div>
                <div className="ci-actions">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQty(item.product_id, item.quantity - 1)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.product_id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="ci-total">₹{(item.price.selling_price * item.quantity).toFixed(2)}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.product_id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="cart-summary card">
            <h3>Order Summary</h3>
            <div className="divider" />
            <div className="summary-row"><span>Subtotal ({itemCount} items)</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>GST & Taxes</span><span>₹{gstAmount.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery</span><span className="free-delivery">{subtotal >= 299 ? 'FREE' : '₹49'}</span></div>
            {savings > 0 && <div className="summary-row savings-row"><span>Savings</span><span>-₹{savings.toFixed(2)}</span></div>}
            <div className="divider" />
            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span>₹{(subtotal >= 299 ? total : total + 49).toFixed(2)}</span>
            </div>
            {subtotal < 299 && (
              <p className="free-delivery-note">
                Add ₹{(299 - subtotal).toFixed(0)} more for FREE delivery!
              </p>
            )}
            <button
              className="btn btn-primary btn-block btn-lg"
              style={{ marginTop: '1rem' }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
            <Link to="/products" className="btn btn-ghost btn-block" style={{ marginTop: '0.5rem' }}>
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
