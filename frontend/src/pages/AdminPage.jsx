import { useState } from 'react';
import { getAllProductsWithDetails, inventory, orders, categories, getDailyReport, getMonthlyReport, getYearlyReport } from '../data/mockData';
import { required, minLength, positiveNumber, validateForm } from '../utils/validators';
import './AdminPage.css';

/* ─── Add Product Modal ─────────────────────────────────────────────────── */
function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '', brand: '', category_id: '', unit: '', mrp: '', selling_price: '', description: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const rules = {
    name:          [(v) => required(v, 'Product name'), (v) => minLength(v, 2, 'Product name')],
    brand:         [(v) => required(v, 'Brand')],
    category_id:   [(v) => required(v, 'Category')],
    unit:          [(v) => required(v, 'Unit')],
    mrp:           [(v) => required(v, 'MRP'), (v) => positiveNumber(v, 'MRP')],
    selling_price: [(v) => required(v, 'Selling price'), (v) => positiveNumber(v, 'Selling price')],
    description:   [(v) => required(v, 'Description'), (v) => minLength(v, 10, 'Description')],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const { errors: newErrors } = validateForm({ ...form, [name]: value }, { [name]: rules[name] });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const { errors: newErrors } = validateForm({ [name]: value }, { [name]: rules[name] });
    setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.keys(rules).reduce((a, k) => ({ ...a, [k]: true }), {}));
    const { errors: allErrors, isValid } = validateForm(form, rules);
    setErrors(allErrors);
    if (!isValid) return;

    // Extra: selling_price <= mrp
    if (parseFloat(form.selling_price) > parseFloat(form.mrp)) {
      setErrors(prev => ({ ...prev, selling_price: 'Selling price must not exceed MRP' }));
      return;
    }
    onAdd(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📦 Add New Product</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input className={`form-input ${errors.name ? 'error' : ''}`} name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Basmati Rice" />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Brand *</label>
              <input className={`form-input ${errors.brand ? 'error' : ''}`} name="brand" value={form.brand} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. India Gate" />
              {errors.brand && <span className="form-error">{errors.brand}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className={`form-input ${errors.category_id ? 'error' : ''}`} name="category_id" value={form.category_id} onChange={handleChange} onBlur={handleBlur}>
                <option value="">Select category</option>
                {categories.map(c => <option key={c.category_id} value={c.category_id}>{c.icon} {c.name}</option>)}
              </select>
              {errors.category_id && <span className="form-error">{errors.category_id}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Unit *</label>
              <input className={`form-input ${errors.unit ? 'error' : ''}`} name="unit" value={form.unit} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 1kg, 500ml" />
              {errors.unit && <span className="form-error">{errors.unit}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">MRP (₹) *</label>
              <input className={`form-input ${errors.mrp ? 'error' : ''}`} name="mrp" type="number" step="0.01" value={form.mrp} onChange={handleChange} onBlur={handleBlur} placeholder="0.00" />
              {errors.mrp && <span className="form-error">{errors.mrp}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Selling Price (₹) *</label>
            <input className={`form-input ${errors.selling_price ? 'error' : ''}`} name="selling_price" type="number" step="0.01" value={form.selling_price} onChange={handleChange} onBlur={handleBlur} placeholder="0.00" />
            {errors.selling_price && <span className="form-error">{errors.selling_price}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea className={`form-input ${errors.description ? 'error' : ''}`} name="description" rows={3} value={form.description} onChange={handleChange} onBlur={handleBlur} placeholder="Product description (min 10 chars)" />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <button className="btn btn-primary btn-block btn-lg" type="submit" style={{ marginTop: '0.5rem' }}>
            ✅ Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Reports Sub-Component ─────────────────────────────────────────────── */
function ReportsPanel() {
  const [reportView, setReportView] = useState('daily');
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const daily = getDailyReport(selectedDate);
  const monthly = getMonthlyReport(selectedYear, selectedMonth);
  const yearly = getYearlyReport(selectedYear);

  const STATUS_CLASS = { completed: 'status-completed', processing: 'status-processing', pending: 'status-pending', cancelled: 'status-cancelled' };

  return (
    <div className="page-enter">
      {/* Sub-tabs */}
      <div className="report-subtabs">
        {[['daily','📅 Daily'],['monthly','📆 Monthly'],['yearly','📊 Yearly']].map(([key, label]) => (
          <button key={key} className={`report-subtab ${reportView === key ? 'active' : ''}`} onClick={() => setReportView(key)}>{label}</button>
        ))}
      </div>

      {/* ── DAILY REPORT ─────────────────────────────────────── */}
      {reportView === 'daily' && (
        <div className="page-enter">
          <div className="report-controls">
            <label className="form-label">Select Date:</label>
            <input type="date" className="form-input" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} max={today} />
          </div>

          <div className="report-kpis">
            <div className="report-kpi card"><span className="kpi-icon">🛒</span><div><strong>{daily.totalOrders}</strong><span>Total Orders</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">✅</span><div><strong>{daily.completedOrders}</strong><span>Completed</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">💰</span><div><strong>₹{daily.totalRevenue.toFixed(0)}</strong><span>Revenue</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">📦</span><div><strong>{daily.totalItemsSold}</strong><span>Items Sold</span></div></div>
          </div>

          {/* Payment breakdown */}
          {Object.keys(daily.paymentBreakdown).length > 0 && (
            <div className="card report-section">
              <h4>💳 Payment Breakdown</h4>
              <div className="payment-bars">
                {Object.entries(daily.paymentBreakdown).map(([method, amount]) => (
                  <div key={method} className="pay-bar-row">
                    <span className="pay-method">{method}</span>
                    <div className="pay-bar-track">
                      <div className="pay-bar-fill" style={{ width: `${(amount / daily.totalRevenue * 100)}%` }} />
                    </div>
                    <span className="pay-amount">₹{amount.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders table */}
          <div className="card table-wrap">
            <table>
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th></tr>
              </thead>
              <tbody>
                {daily.orders.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-400)' }}>No orders on this date</td></tr>
                ) : (
                  daily.orders.map(o => (
                    <tr key={o.order_id}>
                      <td><strong>#{String(o.order_id).padStart(4, '0')}</strong></td>
                      <td>Customer #{o.customer_id}</td>
                      <td>{o.items.length} items</td>
                      <td><strong>₹{o.total_amount.toFixed(0)}</strong></td>
                      <td><span className="badge badge-gray">{o.payment.method}</span></td>
                      <td><span className={`badge ${STATUS_CLASS[o.order_status]}`}>{o.order_status.charAt(0).toUpperCase() + o.order_status.slice(1)}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MONTHLY REPORT ────────────────────────────────────── */}
      {reportView === 'monthly' && (
        <div className="page-enter">
          <div className="report-controls">
            <label className="form-label">Month:</label>
            <select className="form-input" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
              {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
            <label className="form-label">Year:</label>
            <select className="form-input" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
              {[now.getFullYear(), now.getFullYear() - 1].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="report-kpis">
            <div className="report-kpi card"><span className="kpi-icon">🛒</span><div><strong>{monthly.totalOrders}</strong><span>Total Orders</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">✅</span><div><strong>{monthly.completedOrders}</strong><span>Completed</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">💰</span><div><strong>₹{monthly.totalRevenue.toFixed(0)}</strong><span>Revenue</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">📦</span><div><strong>{monthly.totalItemsSold}</strong><span>Items Sold</span></div></div>
          </div>

          {/* Daily revenue bar chart */}
          <div className="card report-section">
            <h4>📊 Daily Revenue — {monthly.monthName}</h4>
            <div className="bar-chart">
              {monthly.dailyRevenue.map(d => {
                const maxRev = Math.max(...monthly.dailyRevenue.map(x => x.revenue), 1);
                const height = (d.revenue / maxRev) * 100;
                return (
                  <div key={d.day} className="bar-col" title={`Day ${d.day}: ₹${d.revenue}`}>
                    <div className="bar-fill" style={{ height: `${height}%` }} />
                    <span className="bar-label">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top products */}
          <div className="card report-section">
            <h4>🏆 Top Selling Products</h4>
            <table>
              <thead><tr><th>#</th><th>Product</th><th>Qty Sold</th><th>Revenue</th></tr></thead>
              <tbody>
                {monthly.topProducts.map((p, i) => (
                  <tr key={i}>
                    <td><strong>{i + 1}</strong></td>
                    <td>{p.name}</td>
                    <td>{p.qty}</td>
                    <td><strong>₹{p.revenue.toFixed(0)}</strong></td>
                  </tr>
                ))}
                {monthly.topProducts.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '1rem', color: 'var(--gray-400)' }}>No data</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Category breakdown */}
          {Object.keys(monthly.categoryRevenue).length > 0 && (
            <div className="card report-section">
              <h4>📁 Category Breakdown</h4>
              <div className="payment-bars">
                {Object.entries(monthly.categoryRevenue).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => (
                  <div key={cat} className="pay-bar-row">
                    <span className="pay-method">{cat}</span>
                    <div className="pay-bar-track">
                      <div className="pay-bar-fill cat-bar" style={{ width: `${(amount / monthly.totalRevenue * 100)}%` }} />
                    </div>
                    <span className="pay-amount">₹{amount.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── YEARLY REPORT ─────────────────────────────────────── */}
      {reportView === 'yearly' && (
        <div className="page-enter">
          <div className="report-controls">
            <label className="form-label">Year:</label>
            <select className="form-input" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
              {[now.getFullYear(), now.getFullYear() - 1].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="report-kpis">
            <div className="report-kpi card"><span className="kpi-icon">🛒</span><div><strong>{yearly.totalOrders}</strong><span>Total Orders</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">✅</span><div><strong>{yearly.completedOrders}</strong><span>Completed</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">💰</span><div><strong>₹{yearly.totalRevenue.toFixed(0)}</strong><span>Revenue</span></div></div>
            <div className="report-kpi card"><span className="kpi-icon">📦</span><div><strong>{yearly.totalItemsSold}</strong><span>Items Sold</span></div></div>
          </div>

          {/* Monthly revenue bar chart */}
          <div className="card report-section">
            <h4>📊 Monthly Revenue — {yearly.year}</h4>
            <div className="bar-chart bar-chart-monthly">
              {yearly.monthlyRevenue.map(m => {
                const maxRev = Math.max(...yearly.monthlyRevenue.map(x => x.revenue), 1);
                const height = (m.revenue / maxRev) * 100;
                return (
                  <div key={m.month} className="bar-col" title={`${m.month}: ₹${m.revenue} (${m.orders} orders)`}>
                    <div className="bar-fill" style={{ height: `${height}%` }} />
                    <span className="bar-label">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category breakdown */}
          {Object.keys(yearly.categoryRevenue).length > 0 && (
            <div className="card report-section">
              <h4>📁 Category Revenue Breakdown</h4>
              <div className="payment-bars">
                {Object.entries(yearly.categoryRevenue).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => (
                  <div key={cat} className="pay-bar-row">
                    <span className="pay-method">{cat}</span>
                    <div className="pay-bar-track">
                      <div className="pay-bar-fill cat-bar" style={{ width: `${(amount / yearly.totalRevenue * 100)}%` }} />
                    </div>
                    <span className="pay-amount">₹{amount.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment breakdown */}
          {Object.keys(yearly.paymentBreakdown).length > 0 && (
            <div className="card report-section">
              <h4>💳 Payment Methods</h4>
              <div className="payment-bars">
                {Object.entries(yearly.paymentBreakdown).sort((a, b) => b[1] - a[1]).map(([method, amount]) => (
                  <div key={method} className="pay-bar-row">
                    <span className="pay-method">{method}</span>
                    <div className="pay-bar-track">
                      <div className="pay-bar-fill" style={{ width: `${(amount / yearly.totalRevenue * 100)}%` }} />
                    </div>
                    <span className="pay-amount">₹{amount.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Admin Page ───────────────────────────────────────────────────── */
export default function AdminPage() {
  const [tab, setTab] = useState('products');
  const allProducts   = getAllProductsWithDetails();
  const [stocks, setStocks] = useState(() => {
    const s = {};
    Object.values(inventory).forEach(i => { s[i.product_id] = i.quantity; });
    return s;
  });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStockChange = (id, delta) => {
    setStocks(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const handleAddProduct = (formData) => {
    console.log('New product added:', formData);
    // In a real app, this would POST to the backend
  };

  const filteredProducts = searchTerm
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    : allProducts;

  const STATUS_CLASS = { completed: 'status-completed', processing: 'status-processing', pending: 'status-pending', cancelled: 'status-cancelled' };

  return (
    <div className="admin-page page-enter">
      <div className="container">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>⚙️ Admin Panel</h1>
            <p>Manage your products, inventory, orders and reports</p>
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
              <div><strong>₹{orders.filter(o => o.order_status !== 'cancelled').reduce((s,o) => s + o.total_amount, 0).toFixed(0)}</strong><span>Revenue</span></div>
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
          {[['products','🛍️ Products'], ['inventory','📊 Inventory'], ['orders','🧾 Orders'], ['reports','📈 Reports']].map(([key, label]) => (
            <button key={key} className={`tab-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {/* PRODUCTS TABLE */}
        {tab === 'products' && (
          <div className="page-enter">
            <div className="admin-toolbar">
              <input className="form-input" placeholder="🔍 Search products…" style={{ maxWidth:'280px' }} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddProduct(true)}>+ Add Product</button>
            </div>
            <div className="card table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Image</th><th>Product</th><th>Brand</th><th>Category</th><th>MRP</th><th>Price</th><th>Stock</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
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
                  <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {orders.slice(0, 20).map(order => (
                    <tr key={order.order_id}>
                      <td><strong>#{order.order_id.toString().padStart(4,'0')}</strong></td>
                      <td>Customer #{order.customer_id}</td>
                      <td style={{fontSize:'0.8rem', color:'var(--gray-500)'}}>{new Date(order.order_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td>{order.items.length} items</td>
                      <td><strong>₹{order.total_amount.toFixed(0)}</strong></td>
                      <td><span className="badge badge-gray">{order.payment.method}</span></td>
                      <td>
                        <span className={`badge ${STATUS_CLASS[order.order_status]}`}>
                          {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {tab === 'reports' && <ReportsPanel />}

        {/* Add Product Modal */}
        {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} onAdd={handleAddProduct} />}
      </div>
    </div>
  );
}
