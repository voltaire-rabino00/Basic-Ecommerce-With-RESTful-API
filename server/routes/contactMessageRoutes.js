const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// RECEIVE A MESSAGE
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newMessage = new ContactMessage({ name, email, message });
        const saved = await newMessage.save();

        res.status(201).json({ message: "Message sent successfully!", data: saved });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
