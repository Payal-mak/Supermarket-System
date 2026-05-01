import pool from "../db.js";

// GET /api/orders
export async function getAllOrders(_req, res, next) {
  try {
    const result = await pool.query(
      `SELECT o.*, c.first_name, c.last_name
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.customer_id
       ORDER BY o.order_date DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:id
export async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    const order = await pool.query(
      `SELECT o.*, c.first_name, c.last_name
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.customer_id
       WHERE o.order_id = $1`,
      [id]
    );
    if (order.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    // Fetch order items
    const items = await pool.query(
      `SELECT oi.*, p.name AS product_name
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.product_id
       WHERE oi.order_id = $1`,
      [id]
    );

    // Fetch payment
    const payment = await pool.query(
      "SELECT * FROM payments WHERE order_id = $1",
      [id]
    );

    res.json({
      success: true,
      data: {
        ...order.rows[0],
        items: items.rows,
        payment: payment.rows[0] || null,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/orders
export async function createOrder(req, res, next) {
  const client = await pool.connect();
  try {
    const { customer_id, items, payment_method } = req.body;
    await client.query("BEGIN");

    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const priceResult = await client.query(
        "SELECT selling_price FROM product_prices WHERE product_id = $1 ORDER BY effective_from DESC LIMIT 1",
        [item.product_id]
      );
      const price = priceResult.rows[0]?.selling_price || 0;
      totalAmount += price * item.quantity;
    }

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (customer_id, order_status, total_amount)
       VALUES ($1, 'pending', $2) RETURNING *`,
      [customer_id, totalAmount]
    );
    const orderId = orderResult.rows[0].order_id;

    // Create order items & update inventory
    for (const item of items) {
      const priceResult = await client.query(
        "SELECT selling_price FROM product_prices WHERE product_id = $1 ORDER BY effective_from DESC LIMIT 1",
        [item.product_id]
      );
      const price = priceResult.rows[0]?.selling_price || 0;

      await client.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES ($1, $2, $3, $4)",
        [orderId, item.product_id, item.quantity, price]
      );

      // Decrease inventory
      await client.query(
        "UPDATE inventory SET quantity = quantity - $1, last_updated = NOW() WHERE product_id = $2",
        [item.quantity, item.product_id]
      );

      // Log stock movement
      await client.query(
        `INSERT INTO stock_movements (product_id, movement_type, quantity_change, reference_note)
         VALUES ($1, 'sale', $2, $3)`,
        [item.product_id, -item.quantity, `Order #${orderId}`]
      );
    }

    // Create payment record
    if (payment_method) {
      await client.query(
        `INSERT INTO payments (order_id, payment_method, payment_status)
         VALUES ($1, $2, 'pending')`,
        [orderId, payment_method]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ success: true, data: orderResult.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
}

// PUT /api/orders/:id/status
export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { order_status } = req.body;
    const result = await pool.query(
      "UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *",
      [order_status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
}
