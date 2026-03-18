-- Seed Data for Supermarket System
\c supermarket;

-- Categories
INSERT INTO categories (name, description) VALUES
('Fruits & Vegetables', 'Fresh fruits and vegetables'),
('Dairy & Eggs', 'Milk, cheese, butter, eggs'),
('Beverages', 'Juices, soft drinks, water'),
('Snacks', 'Chips, biscuits, namkeen'),
('Grains & Pulses', 'Rice, wheat, lentils, dal');

-- Suppliers
INSERT INTO suppliers (supplier_name, phone, email, address) VALUES
('Fresh Farm Co.', '9876543210', 'freshfarm@example.com', '12 Farm Road, Ahmedabad'),
('Dairy Best Pvt Ltd', '9123456780', 'dairybest@example.com', '45 Milk Lane, Anand'),
('QuickBev Distributors', '9988776655', 'quickbev@example.com', '78 Beverage Park, Surat');

-- Products
INSERT INTO products (name, barcode, brand, category_id, supplier_id, unit, description) VALUES
('Banana', 'BAR001', 'Local', 1, 1, 'dozen', 'Fresh yellow bananas'),
('Tomato', 'BAR002', 'Local', 1, 1, 'kg', 'Farm fresh tomatoes'),
('Full Cream Milk', 'BAR003', 'Amul', 2, 2, '500ml', 'Pasteurized full cream milk'),
('Paneer', 'BAR004', 'Amul', 2, 2, '200g', 'Fresh cottage cheese'),
('Mango Juice', 'BAR005', 'Real', 3, 3, '1L', 'Natural mango juice'),
('Mineral Water', 'BAR006', 'Bisleri', 3, 3, '1L', 'Packaged drinking water'),
('Lays Classic Salted', 'BAR007', 'Lays', 4, 3, '26g', 'Classic salted potato chips'),
('Basmati Rice', 'BAR008', 'India Gate', 5, 1, '1kg', 'Premium basmati rice');

-- Product Prices
INSERT INTO product_prices (product_id, mrp, selling_price, gst_percent) VALUES
(1, 50.00, 45.00, 0.00),
(2, 40.00, 35.00, 0.00),
(3, 30.00, 28.00, 5.00),
(4, 80.00, 75.00, 5.00),
(5, 99.00, 90.00, 12.00),
(6, 20.00, 18.00, 12.00),
(7, 20.00, 18.00, 12.00),
(8, 120.00, 110.00, 5.00);

-- Inventory
INSERT INTO inventory (product_id, quantity) VALUES
(1, 100),
(2, 80),
(3, 150),
(4, 60),
(5, 200),
(6, 300),
(7, 250),
(8, 120);

-- Stock Movements (initial stock-in)
INSERT INTO stock_movements (product_id, movement_type, quantity_change, reference_note) VALUES
(1, 'stock_in', 100, 'Initial stock'),
(2, 'stock_in', 80, 'Initial stock'),
(3, 'stock_in', 150, 'Initial stock'),
(4, 'stock_in', 60, 'Initial stock'),
(5, 'stock_in', 200, 'Initial stock'),
(6, 'stock_in', 300, 'Initial stock'),
(7, 'stock_in', 250, 'Initial stock'),
(8, 'stock_in', 120, 'Initial stock');

-- Customers
INSERT INTO customers (first_name, last_name, phone, email) VALUES
('Ravi', 'Patel', '9001122334', 'ravi.patel@example.com'),
('Sneha', 'Shah', '9005566778', 'sneha.shah@example.com'),
('Amit', 'Mehta', '9009988776', 'amit.mehta@example.com');

-- Addresses
INSERT INTO addresses (customer_id, address_line, city, state, pincode) VALUES
(1, '10 Rose Street', 'Ahmedabad', 'Gujarat', '380001'),
(2, '22 Lotus Colony', 'Surat', 'Gujarat', '395001'),
(3, '5 Mango Lane', 'Vadodara', 'Gujarat', '390001');

-- Orders
INSERT INTO orders (customer_id, order_status, total_amount) VALUES
(1, 'completed', 143.00),
(2, 'completed', 108.00),
(3, 'pending', 90.00);

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES
(1, 1, 1, 45.00),
(1, 5, 1, 90.00),
(1, 6, 1, 18.00),
(2, 3, 2, 28.00),
(2, 4, 1, 75.00),
(3, 5, 1, 90.00);

-- Payments
INSERT INTO payments (order_id, payment_method, payment_status, transaction_id) VALUES
(1, 'UPI', 'success', 'TXN001ABC'),
(2, 'cash', 'success', NULL),
(3, 'card', 'pending', NULL);

-- Cart (active session for customer 3)
INSERT INTO cart (customer_id, product_id, quantity) VALUES
(3, 8, 1),
(3, 7, 2);
