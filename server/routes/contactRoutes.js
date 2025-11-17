const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create contact
router.post("/", async (req, res) => {
  try {
    const { name, role, email, image } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = new Contact({ name, role, email, image });
    const saved = await newContact.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
