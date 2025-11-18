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

// Featured Products
const featuredRoutes = require("./routes/featuredRoutes");
app.use("/api/featured", featuredRoutes);



// Contact Message Routes
const contactMessageRoutes = require("./routes/contactMessageRoutes");
app.use("/api/contact-messages", contactMessageRoutes);

// Add to Cart 
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// // Order Routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
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
