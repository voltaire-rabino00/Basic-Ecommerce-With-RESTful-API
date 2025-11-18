const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ADD TO CART
router.post("/", async (req, res) => {
    const { productId } = req.body;

    try {
        const cartItem = new Cart({ productId });
        await cartItem.save();

        const cartCount = await Cart.countDocuments();

        res.json({ message: "Added to cart", cartCount });
    } catch (err) {
        res.status(500).json({ error: "Cannot add to cart" });
    }
});

module.exports = router;
