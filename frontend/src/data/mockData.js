// Mock data — Radhika Shopping Mall

export const categories = [
  { category_id: 1, name: 'Cosmetic',           description: 'Beauty & skincare products',      icon: '💄', color: '#f5d0d8' },
  { category_id: 2, name: 'Bakery',             description: 'Fresh bread, cakes & biscuits',   icon: '🍞', color: '#fef9c3' },
  { category_id: 3, name: 'Grocery',            description: 'Daily essentials & staples',      icon: '🛒', color: '#dcfce7' },
  { category_id: 4, name: 'Hosiery',            description: 'Innerwear, socks & basics',       icon: '🧦', color: '#dbeafe' },
  { category_id: 5, name: 'Stationary',         description: 'Pens, notebooks & school items',  icon: '✏️', color: '#fce7f3' },
  { category_id: 6, name: 'Gift Article',       description: 'Gifts, décor & festive items',    icon: '🎁', color: '#f3e8ff' },
  { category_id: 7, name: 'Household Product',  description: 'Cleaning & home care products',   icon: '🏠', color: '#fff7ed' },
  { category_id: 8, name: 'Plastic Ware',       description: 'Containers, bottles & storage',   icon: '🫙', color: '#e0f2fe' },
  { category_id: 9, name: 'Cold Drinks',        description: 'Soft drinks, juices & water',     icon: '🥤', color: '#dcfce7' },
];

export const products = [
  // Cosmetic
  {
    product_id: 1, name: 'Fair & Lovely Cream', barcode: 'BAR001', brand: 'Glow & Lovely',
    category_id: 1, supplier_id: 1, unit: '50g', rating: 4.3,
    description: 'Skin brightening cream for daily use. Enriched with vitamins for a healthy glow.',
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80',
  },
  {
    product_id: 2, name: 'Coconut Hair Oil', barcode: 'BAR002', brand: 'Parachute',
    category_id: 1, supplier_id: 1, unit: '200ml', rating: 4.5,
    description: '100% pure coconut oil for strong and nourished hair.',
    image_url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
  },
  // Bakery
  {
    product_id: 3, name: 'Bread Loaf', barcode: 'BAR003', brand: 'Modern',
    category_id: 2, supplier_id: 2, unit: '400g', rating: 4.2,
    description: 'Soft white bread, freshly baked. Perfect for sandwiches and toast.',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
  },
  {
    product_id: 4, name: 'Butter Cookies', barcode: 'BAR004', brand: 'Parle',
    category_id: 2, supplier_id: 2, unit: '200g', rating: 4.4,
    description: 'Premium butter cookies, crispy and delicious. Perfect with chai.',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
  },
  // Grocery
  {
    product_id: 5, name: 'Basmati Rice', barcode: 'BAR005', brand: 'India Gate',
    category_id: 3, supplier_id: 1, unit: '1kg', rating: 4.8,
    description: 'Premium aged basmati rice with long grains and aromatic flavor.',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
  },
  {
    product_id: 6, name: 'Aashirvaad Atta', barcode: 'BAR006', brand: 'Aashirvaad',
    category_id: 3, supplier_id: 1, unit: '5kg', rating: 4.6,
    description: 'Whole wheat atta with 100% superior MP wheat. Soft rotis guaranteed.',
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
  },
  // Hosiery
  {
    product_id: 7, name: 'Cotton Socks (3 pair)', barcode: 'BAR007', brand: 'Jockey',
    category_id: 4, supplier_id: 3, unit: '3 pairs', rating: 4.3,
    description: 'Comfortable 100% cotton ankle socks. Breathable and durable.',
    image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80',
  },
  // Stationary
  {
    product_id: 8, name: 'Classmate Notebook', barcode: 'BAR008', brand: 'Classmate',
    category_id: 5, supplier_id: 3, unit: '180 pages', rating: 4.5,
    description: 'Single-line ruled notebook. Smooth writing pages ideal for school.',
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80',
  },
  // Gift Article
  {
    product_id: 9, name: 'Decorative Photo Frame', barcode: 'BAR009', brand: 'Radhika Gifts',
    category_id: 6, supplier_id: 1, unit: '1 piece', rating: 4.6,
    description: 'Elegant crafted photo frame. Perfect for gifting on special occasions.',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&q=80',
  },
  // Household Product
  {
    product_id: 10, name: 'Vim Dishwash Gel', barcode: 'BAR010', brand: 'Vim',
    category_id: 7, supplier_id: 2, unit: '500ml', rating: 4.4,
    description: 'Lemon fragrance dishwash gel. Cuts through grease effectively.',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
  },
  // Plastic Ware
  {
    product_id: 11, name: 'Milton Water Bottle', barcode: 'BAR011', brand: 'Milton',
    category_id: 8, supplier_id: 3, unit: '1L', rating: 4.7,
    description: 'BPA-free, leakproof water bottle. Keeps water cool & fresh.',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
  },
  // Cold Drinks
  {
    product_id: 12, name: 'Thums Up', barcode: 'BAR012', brand: 'Coca-Cola',
    category_id: 9, supplier_id: 3, unit: '750ml', rating: 4.6,
    description: 'Strong cola taste. India\'s most loved cola drink.',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80',
  },
];

export const productPrices = {
  1:  { price_id: 1,  product_id: 1,  mrp: 99,   selling_price: 85,   gst_percent: 18 },
  2:  { price_id: 2,  product_id: 2,  mrp: 120,  selling_price: 105,  gst_percent: 18 },
  3:  { price_id: 3,  product_id: 3,  mrp: 45,   selling_price: 40,   gst_percent: 5 },
  4:  { price_id: 4,  product_id: 4,  mrp: 60,   selling_price: 55,   gst_percent: 12 },
  5:  { price_id: 5,  product_id: 5,  mrp: 120,  selling_price: 110,  gst_percent: 5 },
  6:  { price_id: 6,  product_id: 6,  mrp: 280,  selling_price: 249,  gst_percent: 0 },
  7:  { price_id: 7,  product_id: 7,  mrp: 199,  selling_price: 175,  gst_percent: 5 },
  8:  { price_id: 8,  product_id: 8,  mrp: 35,   selling_price: 30,   gst_percent: 0 },
  9:  { price_id: 9,  product_id: 9,  mrp: 250,  selling_price: 220,  gst_percent: 12 },
  10: { price_id: 10, product_id: 10, mrp: 99,   selling_price: 89,   gst_percent: 18 },
  11: { price_id: 11, product_id: 11, mrp: 299,  selling_price: 269,  gst_percent: 18 },
  12: { price_id: 12, product_id: 12, mrp: 40,   selling_price: 38,   gst_percent: 12 },
};

export const inventory = {
  1:  { product_id: 1,  quantity: 80 },
  2:  { product_id: 2,  quantity: 65 },
  3:  { product_id: 3,  quantity: 120 },
  4:  { product_id: 4,  quantity: 90 },
  5:  { product_id: 5,  quantity: 100 },
  6:  { product_id: 6,  quantity: 50 },
  7:  { product_id: 7,  quantity: 0 },   // out of stock
  8:  { product_id: 8,  quantity: 200 },
  9:  { product_id: 9,  quantity: 35 },
  10: { product_id: 10, quantity: 70 },
  11: { product_id: 11, quantity: 45 },
  12: { product_id: 12, quantity: 150 },
};

export const currentUser = {
  customer_id: 1, first_name: 'Tanvi', last_name: 'Kakadiya',
  phone: '9001122334', email: 'tanvi@example.com',
};

export const addresses = [
  { address_id: 1, customer_id: 1, address_line: '10 Rose Street, Near City Mall', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001' },
  { address_id: 2, customer_id: 1, address_line: 'B-5 Shivalay Apartments, Satellite',city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' },
];

// ─── Extended orders for Reports ─────────────────────────────────────────
function generateOrders() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const paymentMethods = ['UPI', 'Cash', 'Card'];
  const statuses = ['completed', 'completed', 'completed', 'processing', 'pending', 'cancelled'];
  const productList = products;
  const allOrders = [];
  let orderId = 1;

  // Generate orders for the past 12 months
  for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
    const month = (currentMonth - monthOffset + 12) % 12;
    const year = currentMonth - monthOffset < 0 ? currentYear - 1 : currentYear;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 3-8 orders per month (more in recent months)
    const orderCount = monthOffset <= 2 ? 5 + Math.floor(Math.random() * 4) : 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < orderCount; i++) {
      const day = 1 + Math.floor(Math.random() * daysInMonth);
      const hour = 8 + Math.floor(Math.random() * 12);
      const minute = Math.floor(Math.random() * 60);
      const orderDate = new Date(year, month, day, hour, minute);

      // 1-4 items per order
      const itemCount = 1 + Math.floor(Math.random() * 3);
      const usedProductIds = new Set();
      const orderItems = [];
      let totalAmount = 0;

      for (let j = 0; j < itemCount; j++) {
        let prod;
        do {
          prod = productList[Math.floor(Math.random() * productList.length)];
        } while (usedProductIds.has(prod.product_id));
        usedProductIds.add(prod.product_id);

        const qty = 1 + Math.floor(Math.random() * 3);
        const price = productPrices[prod.product_id].selling_price;
        totalAmount += price * qty;
        orderItems.push({
          product_id: prod.product_id,
          name: prod.name,
          category_id: prod.category_id,
          qty,
          price,
        });
      }

      const method = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      allOrders.push({
        order_id: orderId++,
        customer_id: 1 + Math.floor(Math.random() * 3),
        order_status: status,
        total_amount: totalAmount,
        order_date: orderDate.toISOString(),
        items: orderItems,
        payment: {
          method,
          status: status === 'cancelled' ? 'refunded' : status === 'pending' ? 'pending' : 'success',
          txn_id: method !== 'Cash' ? `TXN${String(orderId).padStart(5, '0')}` : null,
        },
      });
    }
  }

  // Sort by date descending
  allOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
  return allOrders;
}

export const orders = generateOrders();

// Store info for receipts/invoices
export const storeInfo = {
  name: 'Radhika Shopping Mall',
  subBrand: 'Radhika Raj Enterprise',
  owners: [
    { name: 'Hiteshbhai Raiyani', phone: '97246 11355' },
    { name: 'Bharatbhai Raiyani', phone: '99254 72271' },
  ],
  address: 'Gundala Road, Opp. Gangotri School, At. Gondal – 360 311, Dist. Rajkot (Gujarat)',
};

export const getProductWithDetails = (id) => {
  const p = products.find(p => p.product_id === id);
  if (!p) return null;
  return { ...p, price: productPrices[id], stock: inventory[id] };
};

export const getAllProductsWithDetails = () =>
  products.map(p => ({ ...p, price: productPrices[p.product_id], stock: inventory[p.product_id] }));

export const discount = (mrp, sp) => Math.round(((mrp - sp) / mrp) * 100);

// ─── Report Aggregation Helpers ──────────────────────────────────────────

export function getDailyReport(dateStr) {
  // dateStr format: 'YYYY-MM-DD'
  const targetDate = dateStr || new Date().toISOString().split('T')[0];
  const dayOrders = orders.filter(o => o.order_date.startsWith(targetDate));

  const totalRevenue = dayOrders
    .filter(o => o.order_status !== 'cancelled')
    .reduce((s, o) => s + o.total_amount, 0);
  const totalOrders = dayOrders.length;
  const completedOrders = dayOrders.filter(o => o.order_status === 'completed').length;
  const totalItemsSold = dayOrders
    .filter(o => o.order_status !== 'cancelled')
    .reduce((s, o) => s + o.items.reduce((si, i) => si + i.qty, 0), 0);

  // Payment method breakdown
  const paymentBreakdown = {};
  dayOrders.filter(o => o.order_status !== 'cancelled').forEach(o => {
    paymentBreakdown[o.payment.method] = (paymentBreakdown[o.payment.method] || 0) + o.total_amount;
  });

  return {
    date: targetDate,
    orders: dayOrders,
    totalRevenue,
    totalOrders,
    completedOrders,
    totalItemsSold,
    paymentBreakdown,
  };
}

export function getMonthlyReport(year, month) {
  // month is 0-indexed
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const monthOrders = orders.filter(o => {
    const d = new Date(o.order_date);
    return d.getFullYear() === y && d.getMonth() === m;
  });

  const nonCancelled = monthOrders.filter(o => o.order_status !== 'cancelled');
  const totalRevenue = nonCancelled.reduce((s, o) => s + o.total_amount, 0);
  const totalOrders = monthOrders.length;
  const completedOrders = monthOrders.filter(o => o.order_status === 'completed').length;
  const totalItemsSold = nonCancelled.reduce((s, o) => s + o.items.reduce((si, i) => si + i.qty, 0), 0);

  // Daily revenue breakdown for chart
  const dailyRevenue = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayRev = nonCancelled
      .filter(o => o.order_date.startsWith(dateStr))
      .reduce((s, o) => s + o.total_amount, 0);
    dailyRevenue.push({ day: d, revenue: Math.round(dayRev) });
  }

  // Top selling products
  const productSales = {};
  nonCancelled.forEach(o => {
    o.items.forEach(i => {
      if (!productSales[i.product_id]) {
        productSales[i.product_id] = { name: i.name, qty: 0, revenue: 0 };
      }
      productSales[i.product_id].qty += i.qty;
      productSales[i.product_id].revenue += i.price * i.qty;
    });
  });
  const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  // Category breakdown
  const categoryRevenue = {};
  nonCancelled.forEach(o => {
    o.items.forEach(i => {
      const cat = categories.find(c => c.category_id === i.category_id);
      const catName = cat ? cat.name : 'Other';
      categoryRevenue[catName] = (categoryRevenue[catName] || 0) + i.price * i.qty;
    });
  });

  // Payment method breakdown
  const paymentBreakdown = {};
  nonCancelled.forEach(o => {
    paymentBreakdown[o.payment.method] = (paymentBreakdown[o.payment.method] || 0) + o.total_amount;
  });

  return {
    year: y, month: m,
    monthName: new Date(y, m).toLocaleString('default', { month: 'long', year: 'numeric' }),
    orders: monthOrders,
    totalRevenue,
    totalOrders,
    completedOrders,
    totalItemsSold,
    dailyRevenue,
    topProducts,
    categoryRevenue,
    paymentBreakdown,
  };
}

export function getYearlyReport(year) {
  const y = year ?? new Date().getFullYear();
  const yearOrders = orders.filter(o => new Date(o.order_date).getFullYear() === y);
  const nonCancelled = yearOrders.filter(o => o.order_status !== 'cancelled');

  const totalRevenue = nonCancelled.reduce((s, o) => s + o.total_amount, 0);
  const totalOrders = yearOrders.length;
  const completedOrders = yearOrders.filter(o => o.order_status === 'completed').length;
  const totalItemsSold = nonCancelled.reduce((s, o) => s + o.items.reduce((si, i) => si + i.qty, 0), 0);

  // Monthly revenue for chart
  const monthlyRevenue = [];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  for (let m = 0; m < 12; m++) {
    const mOrders = nonCancelled.filter(o => new Date(o.order_date).getMonth() === m);
    monthlyRevenue.push({
      month: monthNames[m],
      monthIndex: m,
      revenue: Math.round(mOrders.reduce((s, o) => s + o.total_amount, 0)),
      orders: mOrders.length,
    });
  }

  // Category breakdown
  const categoryRevenue = {};
  nonCancelled.forEach(o => {
    o.items.forEach(i => {
      const cat = categories.find(c => c.category_id === i.category_id);
      const catName = cat ? cat.name : 'Other';
      categoryRevenue[catName] = (categoryRevenue[catName] || 0) + i.price * i.qty;
    });
  });

  // Payment method breakdown
  const paymentBreakdown = {};
  nonCancelled.forEach(o => {
    paymentBreakdown[o.payment.method] = (paymentBreakdown[o.payment.method] || 0) + o.total_amount;
  });

  return {
    year: y,
    orders: yearOrders,
    totalRevenue,
    totalOrders,
    completedOrders,
    totalItemsSold,
    monthlyRevenue,
    categoryRevenue,
    paymentBreakdown,
  };
}
