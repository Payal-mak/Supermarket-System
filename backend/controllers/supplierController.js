import pool from "../db.js";

// GET /api/suppliers
export async function getAllSuppliers(_req, res, next) {
  try {
    const result = await pool.query(
      "SELECT * FROM suppliers ORDER BY supplier_id"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/suppliers/:id
export async function getSupplierById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM suppliers WHERE supplier_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Supplier not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// POST /api/suppliers
export async function createSupplier(req, res, next) {
  try {
    const { supplier_name, phone, email, address } = req.body;
    const result = await pool.query(
      `INSERT INTO suppliers (supplier_name, phone, email, address)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [supplier_name, phone, email, address]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/suppliers/:id
export async function updateSupplier(req, res, next) {
  try {
    const { id } = req.params;
    const { supplier_name, phone, email, address } = req.body;
    const result = await pool.query(
      `UPDATE suppliers
       SET supplier_name = $1, phone = $2, email = $3, address = $4
       WHERE supplier_id = $5 RETURNING *`,
      [supplier_name, phone, email, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Supplier not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/suppliers/:id
export async function deleteSupplier(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM suppliers WHERE supplier_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Supplier not found" });
    }
    res.json({ success: true, message: "Supplier deleted" });
  } catch (err) {
    next(err);
  }
}
