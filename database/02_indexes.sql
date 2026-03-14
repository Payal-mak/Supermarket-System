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