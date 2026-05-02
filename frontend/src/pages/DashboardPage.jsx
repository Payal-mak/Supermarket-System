import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { orders, addresses as initialAddresses } from '../data/mockData';
import './DashboardPage.css';

const STATUS_CLASS = { completed: 'status-completed', processing: 'status-processing', pending: 'status-pending', cancelled: 'status-cancelled' };

export default function DashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('orders');
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ address_line: '', city: '', state: '', pincode: '' });

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.address_line || !newAddr.city || !newAddr.pincode) return alert('Please fill required fields');
    setAddresses([...addresses, { address_id: Date.now(), ...newAddr }]);
    setShowAddAddr(false);
    setNewAddr({ address_line: '', city: '', state: '', pincode: '' });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile saved successfully!');
  };

  return (
    <div className="dashboard page-enter">
      <div className="container">

        {/* Profile header */}
        <div className="dash-hero card">
          <div className="dash-avatar">{user?.first_name?.[0] || 'U'}{user?.last_name?.[0] || ''}</div>
          <div>
            <h2>{user?.first_name} {user?.last_name}</h2>
            <p>📞 {user?.phone || 'Not provided'} &nbsp;·&nbsp; ✉️ {user?.email || 'Not provided'}</p>
            <span className="badge badge-green">🌟 Regular Customer</span>
          </div>
          <div className="dash-stats">
            <div className="dash-stat"><strong>{orders.length}</strong><span>Orders</span></div>
            <div className="dash-stat"><strong>{addresses.length}</strong><span>Addresses</span></div>
            <div className="dash-stat"><strong>₹{orders.reduce((s,o) => s + o.total_amount, 0).toFixed(0)}</strong><span>Spent</span></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {[['orders','📦 Order History'], ['addresses','📍 Addresses'], ['profile','👤 Profile']].map(([key, label]) => (
            <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {/* ORDER HISTORY */}
        {tab === 'orders' && (
          <div className="page-enter">
            {orders.length === 0 ? (
              <div className="empty-state"><div className="empty-icon">📦</div><h3>No orders yet</h3></div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.order_id} className="order-card card">
                    <div className="order-card-header">
                      <div>
                        <h4>Order #{order.order_id.toString().padStart(4, '0')}</h4>
                        <p className="order-date">{new Date(order.order_date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
                      </div>
                      <span className={`badge ${STATUS_CLASS[order.order_status]}`}>
                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                      </span>
                    </div>

                    <div className="order-items-row">
                      {order.items.map((item, i) => (
                        <div key={i} className="oi-chip">
                          <span>{item.name}</span>
                          <span className="oi-qty">×{item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <div className="oc-payment">
                        <span className="badge badge-gray">💳 {order.payment.method}</span>
                        <span className={`badge ${order.payment.status === 'success' ? 'badge-green' : 'badge-orange'}`}>
                          {order.payment.status}
                        </span>
                      </div>
                      <strong className="oc-total">₹{order.total_amount.toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADDRESSES */}
        {tab === 'addresses' && (
          <div className="page-enter">
            <div className="addr-grid">
              {addresses.map(addr => (
                <div key={addr.address_id} className="addr-block card">
                  <div className="addr-block-icon">📍</div>
                  <div>
                    <strong>{user?.first_name} {user?.last_name}</strong>
                    <p>{addr.address_line}</p>
                    <p>{addr.city}, {addr.state}</p>
                    <p>Pincode: {addr.pincode}</p>
                  </div>
                  <div className="addr-block-actions">
                    <button className="btn btn-outline btn-sm">✏️ Edit</button>
                    <button className="btn btn-danger btn-sm">🗑 Remove</button>
                  </div>
                </div>
              ))}
              {showAddAddr ? (
                <div className="addr-block card" style={{ gridColumn: '1 / -1' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Add New Address</h4>
                  <form onSubmit={handleAddAddress} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Address Line</label>
                      <input className="form-input" required value={newAddr.address_line} onChange={e => setNewAddr({...newAddr, address_line: e.target.value})} placeholder="House No, Building, Street, Area" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input className="form-input" required value={newAddr.city} onChange={e => setNewAddr({...newAddr, city: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">State</label>
                        <input className="form-input" required value={newAddr.state} onChange={e => setNewAddr({...newAddr, state: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pincode</label>
                      <input className="form-input" required value={newAddr.pincode} onChange={e => setNewAddr({...newAddr, pincode: e.target.value})} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <button type="submit" className="btn btn-primary">Save Address</button>
                      <button type="button" className="btn btn-outline" onClick={() => setShowAddAddr(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="addr-block addr-add card" onClick={() => setShowAddAddr(true)} style={{ cursor: 'pointer' }}>
                  <div className="add-addr-icon">+</div>
                  <p>Add New Address</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab === 'profile' && (
          <form className="page-enter profile-form card" onSubmit={handleProfileSave}>
            <h3 style={{marginBottom:'1.25rem'}}>Edit Profile</h3>
            <div className="pf-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" defaultValue={user?.first_name} required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" defaultValue={user?.last_name} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" defaultValue={user?.phone} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" defaultValue={user?.email} />
              </div>
            </div>
            <div className="form-group" style={{marginTop:'0.75rem'}}>
              <label className="form-label">Current Password</label>
              <input className="form-input" type="password" placeholder="Enter current password to save changes" required />
            </div>
            <div className="form-group" style={{marginTop:'0.5rem'}}>
              <label className="form-label">New Password</label>
              <input className="form-input" type="password" placeholder="Enter new password (optional)" />
            </div>
            <button type="submit" className="btn btn-primary" style={{marginTop:'1.25rem'}}>Save Changes</button>
          </form>
        )}

      </div>
    </div>
  );
}
