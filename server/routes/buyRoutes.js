const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// BUY NOW
router.post("/", async (req, res) => {
    const { productId } = req.body;

    try {
        const order = new Order({ productId });
        await order.save();

        res.json({ message: "Order placed successfully" });
    } catch (err) {
        res.status(500).json({ error: "Unable to process order" });
    }
});

module.exports = router;
