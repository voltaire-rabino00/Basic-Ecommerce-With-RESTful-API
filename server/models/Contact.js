const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    email: { type: String },
    phone: { type: String },
    image: { type: String },
    message: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
