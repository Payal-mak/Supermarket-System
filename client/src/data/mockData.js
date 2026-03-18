// Mock data matching the PostgreSQL schema exactly

export const categories = [
  { category_id: 1, name: 'Fruits & Vegetables', description: 'Fresh fruits and vegetables', icon: '🥦', color: '#dcfce7' },
  { category_id: 2, name: 'Dairy & Eggs',        description: 'Milk, cheese, butter, eggs',   icon: '🥛', color: '#fef9c3' },
  { category_id: 3, name: 'Beverages',            description: 'Juices, soft drinks, water',   icon: '🧃', color: '#dbeafe' },
  { category_id: 4, name: 'Snacks',               description: 'Chips, biscuits, namkeen',     icon: '🍿', color: '#fce7f3' },
  { category_id: 5, name: 'Grains & Pulses',      description: 'Rice, wheat, lentils, dal',    icon: '🌾', color: '#fff7ed' },
  { category_id: 6, name: 'Personal Care',         description: 'Soap, shampoo, skincare',      icon: '🧴', color: '#f3e8ff' },
];

export const products = [
  {
    product_id: 1, name: 'Banana', barcode: 'BAR001', brand: 'Local Farm',
    category_id: 1, supplier_id: 1, unit: 'dozen', rating: 4.3,
    description: 'Fresh, ripe bananas sourced directly from local farms. Rich in potassium and natural energy.',
    image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
  },
  {
    product_id: 2, name: 'Tomato', barcode: 'BAR002', brand: 'Local Farm',
    category_id: 1, supplier_id: 1, unit: 'kg', rating: 4.1,
    description: 'Farm-fresh tomatoes, perfect for curries, salads and cooking.',
    image_url: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=400&q=80',
  },
  {
    product_id: 3, name: 'Full Cream Milk', barcode: 'BAR003', brand: 'Amul',
    category_id: 2, supplier_id: 2, unit: '500ml', rating: 4.7,
    description: 'Pasteurized full cream milk. Fresh daily delivery, rich in calcium and vitamins.',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
  },
  {
    product_id: 4, name: 'Paneer', barcode: 'BAR004', brand: 'Amul',
    category_id: 2, supplier_id: 2, unit: '200g', rating: 4.5,
    description: 'Fresh cottage cheese made from pure milk. Great source of protein.',
    image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80',
  },
  {
    product_id: 5, name: 'Mango Juice', barcode: 'BAR005', brand: 'Real',
    category_id: 3, supplier_id: 3, unit: '1L', rating: 4.4,
    description: 'Natural mango juice with real fruit pulp. No artificial flavors.',
    image_url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80',
  },
  {
    product_id: 6, name: 'Mineral Water', barcode: 'BAR006', brand: 'Bisleri',
    category_id: 3, supplier_id: 3, unit: '1L', rating: 4.2,
    description: 'Pure packaged drinking water with essential minerals.',
    image_url: 'https://images.unsplash.com/photo-1606168094336-48f205bca457?w=400&q=80',
  },
  {
    product_id: 7, name: 'Lays Classic Salted', barcode: 'BAR007', brand: 'Lays',
    category_id: 4, supplier_id: 3, unit: '26g', rating: 4.6,
    description: 'Crispy classic salted potato chips. Perfect tea-time snack.',
    image_url: 'https://images.unsplash.com/photo-1573482977-a5b8b6aacc53?w=400&q=80',
  },
  {
    product_id: 8, name: 'Basmati Rice', barcode: 'BAR008', brand: 'India Gate',
    category_id: 5, supplier_id: 1, unit: '1kg', rating: 4.8,
    description: 'Premium aged basmati rice with long grains and aromatic flavor.',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
  },
  {
    product_id: 9, name: 'Aashirvaad Atta', barcode: 'BAR009', brand: 'Aashirvaad',
    category_id: 5, supplier_id: 1, unit: '5kg', rating: 4.6,
    description: 'Whole wheat atta with 100% superior MP wheat. Soft rotis guaranteed.',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
  },
  {
    product_id: 10, name: 'Greek Yogurt', barcode: 'BAR010', brand: 'Epigamia',
    category_id: 2, supplier_id: 2, unit: '90g', rating: 4.5,
    description: 'Thick, creamy Greek yogurt. High protein, low sugar.',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
  },
  {
    product_id: 11, name: 'Mixed Nuts', barcode: 'BAR011', brand: 'Happilo',
    category_id: 4, supplier_id: 3, unit: '200g', rating: 4.7,
    description: 'Premium mixed dry fruits and nuts. Rich in healthy fats.',
    image_url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
  },
  {
    product_id: 12, name: 'Green Tea', barcode: 'BAR012', brand: 'Tetley',
    category_id: 3, supplier_id: 3, unit: '25 bags', rating: 4.3,
    description: 'Rich in antioxidants. Light refreshing green tea.',
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
  },
];

export const productPrices = {
  1:  { price_id: 1,  product_id: 1,  mrp: 50,  selling_price: 45,  gst_percent: 0 },
  2:  { price_id: 2,  product_id: 2,  mrp: 40,  selling_price: 35,  gst_percent: 0 },
  3:  { price_id: 3,  product_id: 3,  mrp: 30,  selling_price: 28,  gst_percent: 5 },
  4:  { price_id: 4,  product_id: 4,  mrp: 80,  selling_price: 75,  gst_percent: 5 },
  5:  { price_id: 5,  product_id: 5,  mrp: 99,  selling_price: 90,  gst_percent: 12 },
  6:  { price_id: 6,  product_id: 6,  mrp: 20,  selling_price: 18,  gst_percent: 12 },
  7:  { price_id: 7,  product_id: 7,  mrp: 20,  selling_price: 18,  gst_percent: 12 },
  8:  { price_id: 8,  product_id: 8,  mrp: 120, selling_price: 110, gst_percent: 5 },
  9:  { price_id: 9,  product_id: 9,  mrp: 280, selling_price: 249, gst_percent: 0 },
  10: { price_id: 10, product_id: 10, mrp: 55,  selling_price: 49,  gst_percent: 5 },
  11: { price_id: 11, product_id: 11, mrp: 299, selling_price: 269, gst_percent: 12 },
  12: { price_id: 12, product_id: 12, mrp: 150, selling_price: 129, gst_percent: 5 },
};

export const inventory = {
  1:  { product_id: 1,  quantity: 100 },
  2:  { product_id: 2,  quantity: 80 },
  3:  { product_id: 3,  quantity: 150 },
  4:  { product_id: 4,  quantity: 60 },
  5:  { product_id: 5,  quantity: 200 },
  6:  { product_id: 6,  quantity: 300 },
  7:  { product_id: 7,  quantity: 0 },   // out of stock
  8:  { product_id: 8,  quantity: 120 },
  9:  { product_id: 9,  quantity: 85 },
  10: { product_id: 10, quantity: 40 },
  11: { product_id: 11, quantity: 55 },
  12: { product_id: 12, quantity: 110 },
};

export const currentUser = {
  customer_id: 1, first_name: 'Tanvi', last_name: 'Kakadiya',
  phone: '9001122334', email: 'tanvi@example.com',
};

export const addresses = [
  { address_id: 1, customer_id: 1, address_line: '10 Rose Street, Near City Mall', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001' },
  { address_id: 2, customer_id: 1, address_line: 'B-5 Shivalay Apartments, Satellite',city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' },
];

export const orders = [
  {
    order_id: 1, customer_id: 1, order_status: 'completed', total_amount: 143.00,
    order_date: '2026-03-10T10:30:00',
    items: [
      { product_id: 1, name: 'Banana',      qty: 1, price: 45 },
      { product_id: 5, name: 'Mango Juice', qty: 1, price: 90 },
      { product_id: 6, name: 'Mineral Water',qty:1, price: 18 },
    ],
    payment: { method: 'UPI', status: 'success', txn_id: 'TXN001ABC' }
  },
  {
    order_id: 2, customer_id: 1, order_status: 'completed', total_amount: 108.00,
    order_date: '2026-03-14T14:20:00',
    items: [
      { product_id: 3, name: 'Full Cream Milk', qty: 2, price: 28 },
      { product_id: 4, name: 'Paneer',           qty: 1, price: 75 },
    ],
    payment: { method: 'Cash', status: 'success', txn_id: null }
  },
  {
    order_id: 3, customer_id: 1, order_status: 'processing', total_amount: 90.00,
    order_date: '2026-03-18T08:00:00',
    items: [
      { product_id: 5, name: 'Mango Juice', qty: 1, price: 90 },
    ],
    payment: { method: 'Card', status: 'pending', txn_id: null }
  },
];

export const getProductWithDetails = (id) => {
  const p = products.find(p => p.product_id === id);
  if (!p) return null;
  return { ...p, price: productPrices[id], stock: inventory[id] };
};

export const getAllProductsWithDetails = () =>
  products.map(p => ({ ...p, price: productPrices[p.product_id], stock: inventory[p.product_id] }));

export const discount = (mrp, sp) => Math.round(((mrp - sp) / mrp) * 100);
