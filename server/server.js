const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Contact Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

// Team Routes
const teamRoutes = require("./routes/teamRoutes");
app.use("/api/team", teamRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
