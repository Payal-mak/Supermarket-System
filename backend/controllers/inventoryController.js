import pool from "../db.js";

// GET /api/inventory
export async function getAllInventory(_req, res, next) {
  try {
    const result = await pool.query(
      `SELECT i.*, p.name AS product_name, p.brand, c.name AS category_name
       FROM inventory i
       LEFT JOIN products p ON i.product_id = p.product_id
       LEFT JOIN categories c ON p.category_id = c.category_id
       ORDER BY p.name`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/inventory/:productId
export async function getInventoryByProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const result = await pool.query(
      `SELECT i.*, p.name AS product_name
       FROM inventory i
       LEFT JOIN products p ON i.product_id = p.product_id
       WHERE i.product_id = $1`,
      [productId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Inventory record not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/inventory/:productId  — adjust stock
export async function updateInventory(req, res, next) {
  const client = await pool.connect();
  try {
    const { productId } = req.params;
    const { quantity_change, movement_type = "adjustment", reference_note = "" } = req.body;

    await client.query("BEGIN");

    // Update inventory
    const result = await client.query(
      `UPDATE inventory
       SET quantity = quantity + $1, last_updated = NOW()
       WHERE product_id = $2 RETURNING *`,
      [quantity_change, productId]
    );
    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, error: "Inventory record not found" });
    }

    // Log stock movement
    await client.query(
      `INSERT INTO stock_movements (product_id, movement_type, quantity_change, reference_note)
       VALUES ($1, $2, $3, $4)`,
      [productId, movement_type, quantity_change, reference_note]
    );

    await client.query("COMMIT");
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}

// GET /api/inventory/movements/:productId
export async function getStockMovements(req, res, next) {
  try {
    const { productId } = req.params;
    const result = await pool.query(
      `SELECT * FROM stock_movements
       WHERE product_id = $1
       ORDER BY created_at DESC`,
      [productId]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
}
