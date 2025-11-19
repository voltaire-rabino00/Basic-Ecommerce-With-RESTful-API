const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Product Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Featured Products
const featuredRoutes = require("./routes/featuredRoutes");
app.use("/api/featured", featuredRoutes);

const contactMessageRoutes = require("./routes/contactMessageRoutes");
app.use("/api/contact-messages", contactMessageRoutes);


// Contact Message Routes
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// 
const buyRoutes = require("./routes/buyRoutes");
app.use("/api/buy", buyRoutes);


const orderRoutes = require("./routes/buyRoutes");
app.use("/api/orders", orderRoutes);

// Team Routes
const teamRoutes = require("./routes/teamRoutes");
app.use("/api/team", teamRoutes);


// image
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));




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
