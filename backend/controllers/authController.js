import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET || "radhika_mall_super_secret_key_2026";
const TOKEN_EXPIRY = "7d";

// ─── Hardcoded Admin ─────────────────────────────────────────────────────
const ADMIN_USERNAME = "admin_radhika";
const ADMIN_PASSWORD = "Admin@123";

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password are required." });
    }

    // 1. Check hardcoded admin
    if (username === ADMIN_USERNAME) {
      if (password === ADMIN_PASSWORD) {
        const token = signToken({ id: 0, username: ADMIN_USERNAME, role: "admin" });
        return res.json({
          success: true,
          data: {
            token,
            user: { id: 0, username: ADMIN_USERNAME, first_name: "Admin", last_name: "Radhika", role: "admin" },
          },
        });
      } else {
        return res.status(401).json({ success: false, error: "Invalid password." });
      }
    }

    // 2. Check customer in database
    const result = await pool.query(
      "SELECT customer_id, first_name, last_name, phone, email, username, password_hash, role FROM customers WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: "Invalid username or password." });
    }

    const customer = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, customer.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid username or password." });
    }

    const token = signToken({
      id: customer.customer_id,
      username: customer.username,
      role: customer.role || "customer",
    });

    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: customer.customer_id,
          username: customer.username,
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone || "",
          email: customer.email || "",
          role: customer.role || "customer",
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/register
 */
export async function register(req, res, next) {
  try {
    const { username, password, first_name, last_name, phone, email } = req.body;

    if (!username || !password || !first_name || !last_name) {
      return res.status(400).json({ success: false, error: "Username, password, first name, and last name are required." });
    }

    if (username.length < 3) {
      return res.status(400).json({ success: false, error: "Username must be at least 3 characters." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: "Password must be at least 6 characters." });
    }

    // Block registering as admin username
    if (username.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
      return res.status(400).json({ success: false, error: "This username is reserved." });
    }

    // Check if username already exists
    const existing = await pool.query("SELECT customer_id FROM customers WHERE username = $1", [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, error: "Username already taken." });
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await pool.query("SELECT customer_id FROM customers WHERE email = $1", [email]);
      if (existingEmail.rows.length > 0) {
        return res.status(409).json({ success: false, error: "Email already registered." });
      }
    }

    // Hash password and insert
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `INSERT INTO customers (first_name, last_name, phone, email, username, password_hash, role)
       VALUES ($1, $2, $3, $4, $5, $6, 'customer')
       RETURNING customer_id, first_name, last_name, username, role`,
      [first_name, last_name, phone || null, email || null, username, password_hash]
    );

    const customer = result.rows[0];
    const token = signToken({
      id: customer.customer_id,
      username: customer.username,
      role: "customer",
    });

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: customer.customer_id,
          username: customer.username,
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone || "",
          email: customer.email || "",
          role: "customer",
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me
 * Returns current user from token (requires verifyToken middleware)
 */
export async function getMe(req, res, next) {
  try {
    // Admin
    if (req.user.role === "admin") {
      return res.json({
        success: true,
        data: { id: 0, username: ADMIN_USERNAME, first_name: "Admin", last_name: "Radhika", role: "admin" },
      });
    }

    // Customer from DB
    const result = await pool.query(
      "SELECT customer_id, first_name, last_name, phone, email, username, role FROM customers WHERE customer_id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const c = result.rows[0];
    return res.json({
      success: true,
      data: { id: c.customer_id, username: c.username, first_name: c.first_name, last_name: c.last_name, phone: c.phone || "", email: c.email || "", role: c.role || "customer" },
    });
  } catch (err) {
    next(err);
  }
}
