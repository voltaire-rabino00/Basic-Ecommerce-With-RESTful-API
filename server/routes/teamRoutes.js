const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// GET all team members
router.get("/", async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add team member
router.post("/", async (req, res) => {
  try {
    const member = new Team(req.body);
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
