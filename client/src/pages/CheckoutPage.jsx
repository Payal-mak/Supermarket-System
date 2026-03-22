import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { addresses, currentUser } from '../data/mockData';
import './CheckoutPage.css';

const PAYMENT_METHODS = [
  { id: 'upi',  label: 'UPI',          icon: '📱', sub: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay' },
  { id: 'cash', label: 'Cash on Delivery', icon: '💵', sub: 'Pay when you receive' },
];

export default function CheckoutPage() {
  const { items, itemCount, subtotal, gstAmount, total, savings, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(addresses[0].address_id);
  const [selectedPayment, setSelectedPayment]  = useState('upi');
  const [step,           setStep]             = useState(1); // 1=address, 2=payment, 3=review
  const [placed,         setPlaced]           = useState(false);

  const finalTotal    = (subtotal >= 299 ? total : total + 49).toFixed(2);
  const deliveryFree  = subtotal >= 299;
  const chosenAddress = addresses.find(a => a.address_id === selectedAddress);

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  if (placed) {
    return (
      <div className="container">
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you, <strong>{currentUser.first_name}</strong>! Your order is confirmed and being prepared.</p>
          <p className="success-sub">Redirecting to your dashboard…</p>
          <div className="success-steps">
            <div className="step active"><span>✅</span><p>Order Placed</p></div>
            <div className="step-line" />
            <div className="step"><span>📦</span><p>Processing</p></div>
            <div className="step-line" />
            <div className="step"><span>🚚</span><p>Out for Delivery</p></div>
            <div className="step-line" />
            <div className="step"><span>🏠</span><p>Delivered</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        {/* Step indicator */}
        <div className="step-bar">
          {['Delivery Address', 'Payment', 'Review Order'].map((label, i) => (
            <div key={i} className={`step-indicator ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
              <span>{label}</span>
              {i < 2 && <div className="step-connector" />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">

            {/* STEP 1: ADDRESS */}
            {step === 1 && (
              <div className="checkout-card card page-enter">
                <h3>📍 Select Delivery Address</h3>
                <div className="divider" />
                {addresses.map(addr => (
                  <label key={addr.address_id} className={`address-card ${selectedAddress === addr.address_id ? 'selected' : ''}`}>
                    <input
                      type="radio" name="address"
                      checked={selectedAddress === addr.address_id}
                      onChange={() => setSelectedAddress(addr.address_id)}
                    />
                    <div className="address-detail">
                      <strong>{currentUser.first_name} {currentUser.last_name}</strong>
                      <p>{addr.address_line}</p>
                      <p>{addr.city}, {addr.state} – {addr.pincode}</p>
                      <p>📞 {currentUser.phone}</p>
                    </div>
                    {selectedAddress === addr.address_id && <span className="addr-check">✅</span>}
                  </label>
                ))}
                <button className="btn btn-ghost btn-sm" style={{marginTop:'0.5rem'}}>+ Add New Address</button>
                <button className="btn btn-primary btn-block btn-lg" style={{marginTop:'1.25rem'}} onClick={() => setStep(2)}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 2 && (
              <div className="checkout-card card page-enter">
                <h3>💳 Select Payment Method</h3>
                <div className="divider" />
                {PAYMENT_METHODS.map(pm => (
                  <label key={pm.id} className={`payment-card ${selectedPayment === pm.id ? 'selected' : ''}`}>
                    <input
                      type="radio" name="payment"
                      checked={selectedPayment === pm.id}
                      onChange={() => setSelectedPayment(pm.id)}
                    />
                    <span className="pm-icon">{pm.icon}</span>
                    <div>
                      <strong>{pm.label}</strong>
                      <p>{pm.sub}</p>
                    </div>
                    {selectedPayment === pm.id && <span className="addr-check">✅</span>}
                  </label>
                ))}
                <div style={{display:'flex', gap:'1rem', marginTop:'1.25rem'}}>
                  <button className="btn btn-outline btn-lg" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" style={{flex:1}} onClick={() => setStep(3)}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 3 && (
              <div className="checkout-card card page-enter">
                <h3>📋 Review Your Order</h3>
                <div className="divider" />

                <div className="review-section">
                  <h4>Delivery Address</h4>
                  <p>{chosenAddress?.address_line}, {chosenAddress?.city}, {chosenAddress?.state} – {chosenAddress?.pincode}</p>
                </div>
                <div className="review-section">
                  <h4>Payment Method</h4>
                  <p>{PAYMENT_METHODS.find(p => p.id === selectedPayment)?.icon} {PAYMENT_METHODS.find(p => p.id === selectedPayment)?.label}</p>
                </div>
                <div className="review-section">
                  <h4>Items ({itemCount})</h4>
                  {items.map(item => (
                    <div key={item.product_id} className="review-item">
                      <img src={item.image_url} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <p>Qty: {item.quantity} × ₹{item.price.selling_price}</p>
                      </div>
                      <strong>₹{(item.quantity * item.price.selling_price).toFixed(2)}</strong>
                    </div>
                  ))}
                </div>

                <div style={{display:'flex', gap:'1rem', marginTop:'1.25rem'}}>
                  <button className="btn btn-outline btn-lg" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary btn-lg" style={{flex:1}} onClick={handlePlaceOrder}>
                    🛒 Place Order · ₹{finalTotal}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SUMMARY SIDEBAR */}
          <aside className="checkout-summary card">
            <h3>Order Summary</h3>
            <div className="divider" />
            {items.map(item => (
              <div key={item.product_id} className="sum-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price.selling_price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="divider" />
            <div className="sum-item"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="sum-item"><span>GST</span><span>₹{gstAmount.toFixed(2)}</span></div>
            <div className="sum-item"><span>Delivery</span><span className="free-delivery">{deliveryFree ? 'FREE' : '₹49'}</span></div>
            {savings > 0 && <div className="sum-item" style={{color:'var(--green-600)'}}><span>Savings</span><span>-₹{savings.toFixed(2)}</span></div>}
            <div className="divider" />
            <div className="sum-item total"><span>Total</span><span>₹{finalTotal}</span></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
