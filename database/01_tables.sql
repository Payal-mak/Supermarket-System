CREATE DATABASE supermarket;

\c supermarket;

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(150),
    phone VARCHAR(20),
    email VARCHAR(120),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    barcode VARCHAR(100) UNIQUE,
    brand VARCHAR(100),
    category_id INT,
    supplier_id INT,
    unit VARCHAR(50),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

CREATE TABLE product_prices (
    price_id SERIAL PRIMARY KEY,
    product_id INT,
    mrp NUMERIC(10,2),
    selling_price NUMERIC(10,2),
    gst_percent NUMERIC(5,2),
    effective_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INT UNIQUE,
    quantity INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE stock_movements (
    movement_id SERIAL PRIMARY KEY,
    product_id INT,
    movement_type VARCHAR(50),
    quantity_change INT,
    reference_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    customer_id INT,
    address_line TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),

    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_status VARCHAR(50),
    total_amount NUMERIC(10,2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price_at_order NUMERIC(10,2),

    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    transaction_id VARCHAR(200),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

--future feature
CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    order_id INT,
    delivery_status VARCHAR(50),
    delivery_address TEXT,
    delivery_time TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,

    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

--indexes for fast search
CREATE INDEX idx_product_name
ON products(name);

CREATE INDEX idx_product_barcode
ON products(barcode);

CREATE INDEX idx_product_category
ON products(category_id);

--full text search
CREATE INDEX idx_product_search
ON products
USING GIN (to_tsvector('english', name || ' ' || brand));
