import { useState } from 'react';
import { currentUser, orders, addresses } from '../data/mockData';
import './DashboardPage.css';

const STATUS_CLASS = { completed: 'status-completed', processing: 'status-processing', pending: 'status-pending', cancelled: 'status-cancelled' };

export default function DashboardPage() {
  const [tab, setTab] = useState('orders');

  return (
    <div className="dashboard page-enter">
      <div className="container">

        {/* Profile header */}
        <div className="dash-hero card">
          <div className="dash-avatar">{currentUser.first_name[0]}{currentUser.last_name[0]}</div>
          <div>
            <h2>{currentUser.first_name} {currentUser.last_name}</h2>
            <p>📞 {currentUser.phone} &nbsp;·&nbsp; ✉️ {currentUser.email}</p>
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
                    <strong>{currentUser.first_name} {currentUser.last_name}</strong>
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
              <div className="addr-block addr-add card">
                <div className="add-addr-icon">+</div>
                <p>Add New Address</p>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab === 'profile' && (
          <div className="page-enter profile-form card">
            <h3 style={{marginBottom:'1.25rem'}}>Edit Profile</h3>
            <div className="pf-grid">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" defaultValue={currentUser.first_name} />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" defaultValue={currentUser.last_name} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" defaultValue={currentUser.phone} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" defaultValue={currentUser.email} />
              </div>
            </div>
            <div className="form-group" style={{marginTop:'0.75rem'}}>
              <label className="form-label">Current Password</label>
              <input className="form-input" type="password" placeholder="Enter current password" />
            </div>
            <div className="form-group" style={{marginTop:'0.5rem'}}>
              <label className="form-label">New Password</label>
              <input className="form-input" type="password" placeholder="Enter new password" />
            </div>
            <button className="btn btn-primary" style={{marginTop:'1.25rem'}}>Save Changes</button>
          </div>
        )}

      </div>
    </div>
  );
}
