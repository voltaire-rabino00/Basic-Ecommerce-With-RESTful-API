const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/product");

// Create order from cart (or direct buy): POST /api/orders { cartId } or { items: [...] , customer: {...} }
router.post("/", async (req, res) => {
  try {
    let items = [];
    if (req.body.cartId) {
      const cart = await Cart.findById(req.body.cartId).populate("items.product");
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      items = cart.items.map(i => ({ product: i.product._id, quantity: i.quantity, priceAtPurchase: i.product.price }));
    } else if (req.body.items) {
      // items from body: [{ productId, quantity }]
      for (const it of req.body.items) {
        const p = await Product.findById(it.productId);
        if (!p) return res.status(404).json({ message: "Product not found" });
        items.push({ product: p._id, quantity: it.quantity || 1, priceAtPurchase: p.price });
      }
    } else {
      return res.status(400).json({ message: "Provide cartId or items" });
    }

    const total = items.reduce((s, it) => s + it.quantity * it.priceAtPurchase, 0);
    const order = new Order({ items, total, customer: req.body.customer || {} });
    const saved = await order.save();

    // optional: remove cart if cartId provided
    if (req.body.cartId) await Cart.findByIdAndDelete(req.body.cartId);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET orders (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
