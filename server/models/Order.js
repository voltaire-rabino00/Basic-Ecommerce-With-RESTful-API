const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
