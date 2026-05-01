import pool from "../db.js";

// GET /api/categories
export async function getAllCategories(_req, res, next) {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY category_id"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/categories/:id
export async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM categories WHERE category_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// POST /api/categories
export async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body;
    const result = await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// PUT /api/categories/:id
export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(
      "UPDATE categories SET name = $1, description = $2 WHERE category_id = $3 RETURNING *",
      [name, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/categories/:id
export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM categories WHERE category_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    next(err);
  }
}
