const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/product");

// Create a new cart (optional) or add item to cart by cartId
router.post("/", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const cart = new Cart({ sessionId, items: [] });
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart: POST /api/cart/:cartId/items  body { productId, quantity }
router.post("/:cartId/items", async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity = 1 } = req.body;
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // if item exists, increment
    const existing = cart.items.find(i => i.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart
router.get("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item or update item quantity
router.put("/:cartId/items/:itemId", async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (quantity <= 0) item.remove();
    else item.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Empty or delete cart
router.delete("/:cartId", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
