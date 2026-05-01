import pool from "../db.js";

// GET /api/products
export async function getAllProducts(req, res, next) {
  try {
    const { category_id, search, limit = 50, offset = 0 } = req.query;
    let query = `
      SELECT p.*, c.name AS category_name,
             pp.mrp, pp.selling_price, pp.gst_percent,
             i.quantity AS stock_quantity
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_prices pp ON p.product_id = pp.product_id
      LEFT JOIN inventory i ON p.product_id = i.product_id
    `;
    const params = [];
    const conditions = [];

    if (category_id) {
      params.push(category_id);
      conditions.push(`p.category_id = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(p.name ILIKE $${params.length} OR p.brand ILIKE $${params.length})`);
    }

    if (conditions.length) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY p.product_id";
    params.push(limit);
    query += ` LIMIT $${params.length}`;
    params.push(offset);
    query += ` OFFSET $${params.length}`;

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows, count: result.rowCount });
  } catch (err) {
    next(err);
  }
}

// GET /api/products/:id
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, c.name AS category_name, s.supplier_name,
              pp.mrp, pp.selling_price, pp.gst_percent,
              i.quantity AS stock_quantity
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.category_id
       LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
       LEFT JOIN product_prices pp ON p.product_id = pp.product_id
       LEFT JOIN inventory i ON p.product_id = i.product_id
       WHERE p.product_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// POST /api/products
export async function createProduct(req, res, next) {
  try {
    const { name, barcode, brand, category_id, supplier_id, unit, description, image_url } = req.body;
    const result = await pool.query(
      `INSERT INTO products (name, barcode, brand, category_id, supplier_id, unit, description, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, barcode, brand, category_id, supplier_id, unit, description, image_url]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/products/:id
export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, barcode, brand, category_id, supplier_id, unit, description, image_url } = req.body;
    const result = await pool.query(
      `UPDATE products
       SET name = $1, barcode = $2, brand = $3, category_id = $4,
           supplier_id = $5, unit = $6, description = $7, image_url = $8
       WHERE product_id = $9
       RETURNING *`,
      [name, barcode, brand, category_id, supplier_id, unit, description, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/products/:id
export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
}
