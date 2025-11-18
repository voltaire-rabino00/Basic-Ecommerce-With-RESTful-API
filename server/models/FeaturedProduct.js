const mongoose = require("mongoose");

const FeaturedProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedProduct", FeaturedProductSchema);
