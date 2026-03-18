import { useState } from 'react';
import { getAllProductsWithDetails, inventory, orders } from '../data/mockData';
import './AdminPage.css';

export default function AdminPage() {
  const [tab, setTab] = useState('products');
  const allProducts   = getAllProductsWithDetails();
  const [stocks, setStocks] = useState(() => {
    const s = {};
    Object.values(inventory).forEach(i => { s[i.product_id] = i.quantity; });
    return s;
  });

  const handleStockChange = (id, delta) => {
    setStocks(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const STATUS_CLASS = { completed: 'status-completed', processing: 'status-processing', pending: 'status-pending', cancelled: 'status-cancelled' };

  return (
    <div className="admin-page page-enter">
      <div className="container">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>⚙️ Admin Panel</h1>
            <p>Manage your products, inventory and orders</p>
          </div>
          <div className="admin-kpis">
            <div className="kpi-card card">
              <span className="kpi-icon">📦</span>
              <div><strong>{allProducts.length}</strong><span>Products</span></div>
            </div>
            <div className="kpi-card card">
              <span className="kpi-icon">🛒</span>
              <div><strong>{orders.length}</strong><span>Orders</span></div>
            </div>
            <div className="kpi-card card">
              <span className="kpi-icon">💰</span>
              <div><strong>₹{orders.reduce((s,o) => s + o.total_amount, 0).toFixed(0)}</strong><span>Revenue</span></div>
            </div>
            <div className="kpi-card card">
              <span className="kpi-icon">⚠️</span>
              <div>
                <strong>{Object.values(stocks).filter(q => q < 20).length}</strong>
                <span>Low Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {[['products','🛍️ Products'], ['inventory','📊 Inventory'], ['orders','🧾 Orders']].map(([key, label]) => (
            <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {/* PRODUCTS TABLE */}
        {tab === 'products' && (
          <div className="page-enter">
            <div className="admin-toolbar">
              <input className="form-input" placeholder="🔍 Search products…" style={{ maxWidth:'280px' }} />
              <button className="btn btn-primary btn-sm">+ Add Product</button>
            </div>
            <div className="card table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Image</th><th>Product</th><th>Brand</th><th>Category</th><th>MRP</th><th>Price</th><th>Stock</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map(p => (
                    <tr key={p.product_id}>
                      <td>#{p.product_id}</td>
                      <td><img src={p.image_url} alt={p.name} className="admin-thumb" /></td>
                      <td><strong>{p.name}</strong><br/><span style={{fontSize:'0.75rem',color:'var(--gray-400)'}}>{p.unit}</span></td>
                      <td>{p.brand}</td>
                      <td>{p.category_id}</td>
                      <td>₹{p.price.mrp}</td>
                      <td><strong style={{color:'var(--green-700)'}}>₹{p.price.selling_price}</strong></td>
                      <td>
                        <span className={`badge ${stocks[p.product_id] === 0 ? 'badge-red' : stocks[p.product_id] < 20 ? 'badge-orange' : 'badge-green'}`}>
                          {stocks[p.product_id]}
                        </span>
                      </td>
                      <td>
                        <div style={{display:'flex', gap:'0.35rem'}}>
                          <button className="btn btn-ghost btn-sm">✏️</button>
                          <button className="btn btn-danger btn-sm">🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVENTORY TABLE */}
        {tab === 'inventory' && (
          <div className="page-enter">
            <div className="card table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th><th>Brand</th><th>Current Stock</th><th>Status</th><th>Adjust Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map(p => {
                    const qty = stocks[p.product_id];
                    return (
                      <tr key={p.product_id}>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.brand}</td>
                        <td><strong>{qty}</strong> {p.unit}</td>
                        <td>
                          <span className={`badge ${qty === 0 ? 'badge-red' : qty < 20 ? 'badge-orange' : 'badge-green'}`}>
                            {qty === 0 ? 'Out of Stock' : qty < 20 ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                        <td>
                          <div className="inv-adjust">
                            <button className="qty-btn" onClick={() => handleStockChange(p.product_id, -10)}>−10</button>
                            <span className="qty-value">{qty}</span>
                            <button className="qty-btn" onClick={() => handleStockChange(p.product_id, 10)}>+10</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TABLE */}
        {tab === 'orders' && (
          <div className="page-enter">
            <div className="card table-wrap">
              <table>
                <thead>
                  <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.order_id}>
                      <td><strong>#{order.order_id.toString().padStart(4,'0')}</strong></td>
                      <td>Customer #{order.customer_id}</td>
                      <td>{order.items.length} items</td>
                      <td><strong>₹{order.total_amount}</strong></td>
                      <td><span className="badge badge-gray">{order.payment.method}</span></td>
                      <td>
                        <span className={`badge ${STATUS_CLASS[order.order_status]}`}>
                          {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div style={{display:'flex', gap:'0.35rem'}}>
                          <button className="btn btn-ghost btn-sm">👁 View</button>
                          <select className="form-input" style={{padding:'0.25rem 0.5rem', fontSize:'0.75rem', borderRadius:'6px'}}>
                            <option>Update Status</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
