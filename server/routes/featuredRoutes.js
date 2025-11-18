const express = require("express");
const router = express.Router();
const FeaturedProduct = require("../models/FeaturedProduct");

// GET all featured products
router.get("/", async (req, res) => {
    try {
        const items = await FeaturedProduct.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new featured product
router.post("/", async (req, res) => {
    try {
        const newItem = new FeaturedProduct(req.body);
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
