import pool from "../db.js";

// GET /api/customers
export async function getAllCustomers(_req, res, next) {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY customer_id"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/customers/:id
export async function getCustomerById(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [id]
    );
    if (customer.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    // Also fetch addresses
    const addresses = await pool.query(
      "SELECT * FROM addresses WHERE customer_id = $1",
      [id]
    );

    res.json({
      success: true,
      data: { ...customer.rows[0], addresses: addresses.rows },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/customers
export async function createCustomer(req, res, next) {
  try {
    const { first_name, last_name, phone, email } = req.body;
    const result = await pool.query(
      `INSERT INTO customers (first_name, last_name, phone, email)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, phone, email]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/customers/:id
export async function updateCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone, email } = req.body;
    const result = await pool.query(
      `UPDATE customers
       SET first_name = $1, last_name = $2, phone = $3, email = $4
       WHERE customer_id = $5 RETURNING *`,
      [first_name, last_name, phone, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/customers/:id
export async function deleteCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, message: "Customer deleted" });
  } catch (err) {
    next(err);
  }
}
