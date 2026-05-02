import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "radhika_mall_super_secret_key_2026";

/**
 * Verify JWT token from Authorization header.
 * Sets req.user = { id, username, role }
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid or expired token." });
  }
}

/**
 * Require admin role. Must be used AFTER verifyToken.
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, error: "Admin access required." });
  }
  next();
}
