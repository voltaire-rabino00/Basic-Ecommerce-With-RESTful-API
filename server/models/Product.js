const mongoose = require("mongoose");

// ProductSchema
// Ito ang schema para sa products ng application
// Ginagamit ito para mag-store ng product details (pang shop / catalog)
const productSchema = new mongoose.Schema({

  // name
  // Pangalan ng product
  name: {
    type: String,
    required: true,
  },

  // price
  // Presyo ng product
  price: {
    type: Number,
    required: true,
  },

  // description
  // Optional na description o details ng product
  description: String,

  // image
  // Image URL or file path ng product
  image: String,

}, { 
  // timestamps
  // Auto-generated fields: createdAt at updatedAt
  // Useful for tracking product creation and updates
  timestamps: true 
});

// Export ng Product model
// Ginagamit ito sa controllers para sa CRUD operations ng products
module.exports = mongoose.model("Product", productSchema);
