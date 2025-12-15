const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
// Parses incoming JSON requests
app.use(express.json());

// Enables Cross-Origin Resource Sharing
app.use(cors());

//Product Routes
// Handles product CRUD operations
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Featured Product Routes
// Handles featured products (homepage highlights)
const featuredRoutes = require("./routes/featuredRoutes");
app.use("/api/featured", featuredRoutes);

// Contact Message Routes
// Handles "Contact Us" form submissions
const contactMessageRoutes = require("./routes/contactMessageRoutes");
app.use("/api/contact-messages", contactMessageRoutes);


// Cart Routes
// Handles add, view, update, remove cart items
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// Order Routes
// Handles order records and order history
const buyRoutes = require("./routes/buyRoutes");
app.use("/api/buy", buyRoutes);


const orderRoutes = require("./routes/buyRoutes");
app.use("/api/orders", orderRoutes);

// Team Routes
// Handles team member profiles (About Us / Team page)
const teamRoutes = require("./routes/teamRoutes");
app.use("/api/team", teamRoutes);


//  Serve uploaded images
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));




// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
