import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { addresses as defaultAddresses, currentUser, storeInfo } from '../data/mockData';
import {
  required, minLength, phone, pincode, validateForm,
  cardNumber, cardExpiry, cvv, upiId, formatCardNumber, formatExpiry,
} from '../utils/validators';
import './CheckoutPage.css';

const PAYMENT_METHODS = [
  { id: 'upi',  label: 'UPI',          icon: '📱', sub: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay' },
  { id: 'cash', label: 'Cash on Delivery', icon: '💵', sub: 'Pay when you receive' },
];

/* ─── Add Address Modal ─────────────────────────────────────────────────── */
function AddAddressModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    full_name: '', phone: '', address_line: '', city: '', state: 'Gujarat', pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const rules = {
    full_name:    [(v) => required(v, 'Full name'), (v) => minLength(v, 2, 'Full name')],
    phone:        [(v) => required(v, 'Phone number'), phone],
    address_line: [(v) => required(v, 'Address'), (v) => minLength(v, 5, 'Address')],
    city:         [(v) => required(v, 'City')],
    state:        [(v) => required(v, 'State')],
    pincode:      [(v) => required(v, 'Pincode'), pincode],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const { errors: ne } = validateForm({ ...form, [name]: value }, { [name]: rules[name] });
      setErrors(prev => ({ ...prev, [name]: ne[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const { errors: ne } = validateForm({ [name]: value }, { [name]: rules[name] });
    setErrors(prev => ({ ...prev, [name]: ne[name] || '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.keys(rules).reduce((a, k) => ({ ...a, [k]: true }), {}));
    const { errors: allErrors, isValid } = validateForm(form, rules);
    setErrors(allErrors);
    if (!isValid) return;
    onAdd(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📍 Add New Address</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className={`form-input ${errors.full_name ? 'error' : ''}`} name="full_name" value={form.full_name} onChange={handleChange} onBlur={handleBlur} placeholder="Tanvi Kakadiya" />
              {errors.full_name && <span className="form-error">{errors.full_name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input className={`form-input ${errors.phone ? 'error' : ''}`} name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder="98765 43210" maxLength={10} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Address Line *</label>
            <input className={`form-input ${errors.address_line ? 'error' : ''}`} name="address_line" value={form.address_line} onChange={handleChange} onBlur={handleBlur} placeholder="House no, Street, Area" />
            {errors.address_line && <span className="form-error">{errors.address_line}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input className={`form-input ${errors.city ? 'error' : ''}`} name="city" value={form.city} onChange={handleChange} onBlur={handleBlur} placeholder="Ahmedabad" />
              {errors.city && <span className="form-error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">State *</label>
              <input className={`form-input ${errors.state ? 'error' : ''}`} name="state" value={form.state} onChange={handleChange} onBlur={handleBlur} placeholder="Gujarat" />
              {errors.state && <span className="form-error">{errors.state}</span>}
            </div>
          </div>
          <div className="form-group" style={{ maxWidth: '200px' }}>
            <label className="form-label">Pincode *</label>
            <input className={`form-input ${errors.pincode ? 'error' : ''}`} name="pincode" value={form.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="380001" maxLength={6} />
            {errors.pincode && <span className="form-error">{errors.pincode}</span>}
          </div>
          <button className="btn btn-primary btn-block btn-lg" type="submit" style={{ marginTop: '0.5rem' }}>
            ✅ Save Address
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Checkout ─────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const { items, itemCount, subtotal, gstAmount, total, savings, clearCart } = useCart();
  const navigate = useNavigate();

  const [addressList, setAddressList] = useState(defaultAddresses);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddresses[0].address_id);
  const [selectedPayment, setSelectedPayment]  = useState('upi');
  const [step,           setStep]             = useState(1);
  const [placed,         setPlaced]           = useState(false);
  const [showAddAddress, setShowAddAddress]   = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Card form state
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [cardErrors, setCardErrors] = useState({});
  const [cardTouched, setCardTouched] = useState({});

  // UPI form state
  const [upiForm, setUpiForm] = useState({ upi_id: '' });
  const [upiErrors, setUpiErrors] = useState({});
  const [upiTouched, setUpiTouched] = useState({});

  const finalTotal    = (subtotal >= 299 ? total : total + 49).toFixed(2);
  const deliveryFree  = subtotal >= 299;
  const chosenAddress = addressList.find(a => a.address_id === selectedAddress);

  // Card validation rules
  const cardRules = {
    number: [(v) => required(v, 'Card number'), cardNumber],
    expiry: [(v) => required(v, 'Expiry'), cardExpiry],
    cvv:    [(v) => required(v, 'CVV'), cvv],
    name:   [(v) => required(v, 'Cardholder name'), (v) => minLength(v, 2, 'Name')],
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') value = formatCardNumber(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    setCardForm(prev => ({ ...prev, [name]: value }));
    if (cardTouched[name]) {
      const { errors: ne } = validateForm({ ...cardForm, [name]: value }, { [name]: cardRules[name] });
      setCardErrors(prev => ({ ...prev, [name]: ne[name] || '' }));
    }
  };

  const handleCardBlur = (e) => {
    const { name, value } = e.target;
    setCardTouched(prev => ({ ...prev, [name]: true }));
    const { errors: ne } = validateForm({ [name]: value }, { [name]: cardRules[name] });
    setCardErrors(prev => ({ ...prev, [name]: ne[name] || '' }));
  };

  // UPI validation
  const handleUpiChange = (e) => {
    const { value } = e.target;
    setUpiForm({ upi_id: value });
    if (upiTouched.upi_id) {
      const err = required(value, 'UPI ID') || upiId(value);
      setUpiErrors({ upi_id: err });
    }
  };

  const handleUpiBlur = () => {
    setUpiTouched({ upi_id: true });
    const err = required(upiForm.upi_id, 'UPI ID') || upiId(upiForm.upi_id);
    setUpiErrors({ upi_id: err });
  };

  // Validate payment details before proceeding to review
  const validatePaymentStep = () => {
    if (selectedPayment === 'card') {
      setCardTouched({ number: true, expiry: true, cvv: true, name: true });
      const { errors: allErrors, isValid } = validateForm(cardForm, cardRules);
      setCardErrors(allErrors);
      return isValid;
    }
    if (selectedPayment === 'upi') {
      setUpiTouched({ upi_id: true });
      const err = required(upiForm.upi_id, 'UPI ID') || upiId(upiForm.upi_id);
      setUpiErrors({ upi_id: err });
      return !err;
    }
    return true; // cash on delivery needs no validation
  };

  const handleContinueToReview = () => {
    if (validatePaymentStep()) {
      setStep(3);
    }
  };

  const handleAddAddress = (formData) => {
    const newAddr = {
      address_id: Date.now(),
      customer_id: 1,
      address_line: formData.address_line,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };
    setAddressList(prev => [...prev, newAddr]);
    setSelectedAddress(newAddr.address_id);
  };

  /* ─── Razorpay Payment Flow ──────────────────────────── */
  const initiateRazorpayPayment = async () => {
    setPaymentProcessing(true);
    try {
      // Step 1: Create order on backend
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(finalTotal),
          receipt: `order_${Date.now()}`,
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.data.keyId,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: storeInfo.name,
        description: `Order of ${itemCount} items`,
        order_id: orderData.data.orderId,
        prefill: {
          name: currentUser.first_name + ' ' + currentUser.last_name,
          email: currentUser.email,
          contact: currentUser.phone,
        },
        theme: {
          color: '#B91F3F',
        },
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setPlaced(true);
              clearCart();
              setTimeout(() => navigate('/dashboard'), 3000);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch {
            alert('Payment verification error. Please contact support.');
          }
          setPaymentProcessing(false);
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
          },
        },
      };

      if (typeof window.Razorpay !== 'undefined') {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert(`Payment failed: ${response.error.description}`);
          setPaymentProcessing(false);
        });
        rzp.open();
      } else {
        // Fallback: simulate payment for demo/offline
        console.warn('Razorpay SDK not loaded. Simulating payment...');
        setTimeout(() => {
          setPlaced(true);
          clearCart();
          setPaymentProcessing(false);
          setTimeout(() => navigate('/dashboard'), 3000);
        }, 1500);
      }
    } catch (err) {
      console.error('Payment error:', err);
      // Fallback: simulate for demo if backend not running
      console.warn('Backend not reachable. Simulating payment...');
      setTimeout(() => {
        setPlaced(true);
        clearCart();
        setPaymentProcessing(false);
        setTimeout(() => navigate('/dashboard'), 3000);
      }, 1500);
    }
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === 'cash') {
      // Cash on Delivery — no payment gateway needed
      setPlaced(true);
      clearCart();
      setTimeout(() => navigate('/dashboard'), 3000);
    } else {
      // UPI or Card — use Razorpay
      initiateRazorpayPayment();
    }
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
                {addressList.map(addr => (
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
                <button className="btn btn-ghost btn-sm" style={{marginTop:'0.5rem'}} onClick={() => setShowAddAddress(true)}>+ Add New Address</button>
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

                {/* Card Details Form */}
                {selectedPayment === 'card' && (
                  <div className="payment-details-form page-enter">
                    <h4>Enter Card Details</h4>
                    <div className="form-group">
                      <label className="form-label">Card Number *</label>
                      <input className={`form-input ${cardErrors.number ? 'error' : ''}`} name="number" value={cardForm.number} onChange={handleCardChange} onBlur={handleCardBlur} placeholder="4111 1111 1111 1111" maxLength={23} />
                      {cardErrors.number && <span className="form-error">{cardErrors.number}</span>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Expiry (MM/YY) *</label>
                        <input className={`form-input ${cardErrors.expiry ? 'error' : ''}`} name="expiry" value={cardForm.expiry} onChange={handleCardChange} onBlur={handleCardBlur} placeholder="MM/YY" maxLength={5} />
                        {cardErrors.expiry && <span className="form-error">{cardErrors.expiry}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV *</label>
                        <input className={`form-input ${cardErrors.cvv ? 'error' : ''}`} name="cvv" type="password" value={cardForm.cvv} onChange={handleCardChange} onBlur={handleCardBlur} placeholder="•••" maxLength={4} />
                        {cardErrors.cvv && <span className="form-error">{cardErrors.cvv}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cardholder Name *</label>
                      <input className={`form-input ${cardErrors.name ? 'error' : ''}`} name="name" value={cardForm.name} onChange={handleCardChange} onBlur={handleCardBlur} placeholder="Name on card" />
                      {cardErrors.name && <span className="form-error">{cardErrors.name}</span>}
                    </div>
                    <p className="test-hint">🧪 Test card: <code>4111 1111 1111 1111</code>, any future expiry, any 3-digit CVV</p>
                  </div>
                )}

                {/* UPI Details Form */}
                {selectedPayment === 'upi' && (
                  <div className="payment-details-form page-enter">
                    <h4>Enter UPI Details</h4>
                    <div className="form-group">
                      <label className="form-label">UPI ID *</label>
                      <input className={`form-input ${upiErrors.upi_id ? 'error' : ''}`} value={upiForm.upi_id} onChange={handleUpiChange} onBlur={handleUpiBlur} placeholder="yourname@upi" />
                      {upiErrors.upi_id && <span className="form-error">{upiErrors.upi_id}</span>}
                    </div>
                    <p className="test-hint">🧪 Test UPI: <code>success@razorpay</code></p>
                  </div>
                )}

                <div style={{display:'flex', gap:'1rem', marginTop:'1.25rem'}}>
                  <button className="btn btn-outline btn-lg" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" style={{flex:1}} onClick={handleContinueToReview}>
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
                  {selectedPayment === 'card' && <p style={{fontSize:'0.8rem', color:'var(--gray-400)'}}>Card ending in {cardForm.number.replace(/\s/g, '').slice(-4)}</p>}
                  {selectedPayment === 'upi' && <p style={{fontSize:'0.8rem', color:'var(--gray-400)'}}>UPI: {upiForm.upi_id}</p>}
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
                  <button
                    className="btn btn-primary btn-lg"
                    style={{flex:1}}
                    onClick={handlePlaceOrder}
                    disabled={paymentProcessing}
                  >
                    {paymentProcessing ? '⏳ Processing…' : `🛒 Place Order · ₹${finalTotal}`}
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

            {/* Secure payment badge */}
            <div className="secure-badge">
              <span>🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <p>Powered by Razorpay. 256-bit SSL encryption.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddress && <AddAddressModal onClose={() => setShowAddAddress(false)} onAdd={handleAddAddress} />}
    </div>
  );
}
