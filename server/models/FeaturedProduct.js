const mongoose = require("mongoose");

// FeaturedProductSchema
// Ito ang schema para sa mga featured products
// Ginagamit ito para i-highlight ang selected products (e.g. homepage, promotions)
const FeaturedProductSchema = new mongoose.Schema(
  {
    // name
    // Pangalan ng featured product
    name: { 
      type: String, 
      required: true 
    },

    // description
    // Optional na description o short details ng product
    description: { 
      type: String 
    },

    // price
    // Presyo ng featured product
    price: { 
      type: Number, 
      required: true 
    },

    // image
    // Image URL or file path ng product
    image: { 
      type: String, 
      required: true 
    },

    // category
    // Category kung saan kabilang ang product (optional)
    category: { 
      type: String 
    },
  },
  {
    // timestamps
    // Auto-generated fields: createdAt at updatedAt
    // Useful for tracking kung kailan na-feature or na-update ang product
    timestamps: true
  }
);

// Export ng FeaturedProduct model
// Ginagamit ito sa controllers para sa CRUD operations ng featured products
module.exports = mongoose.model("FeaturedProduct", FeaturedProductSchema);
