const mongoose = require("mongoose");

// CartSchema
// Ito ang structure ng "Cart" collection sa MongoDB
// Ginagamit ito para mag-store ng products na in-add ng user sa cart
const CartSchema = new mongoose.Schema({

    // productId
    // Reference ito sa Product collection
    // Ibig sabihin, bawat cart item ay naka-link sa isang product
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },

    // quantity
    // Ilang piraso ng product ang nasa cart
    // Default ay 1 kapag bagong add sa cart
    quantity: { 
        type: Number, 
        default: 1 
    },

    // addedAt
    // Timestamp kung kailan in-add ang product sa cart
    // Useful for tracking or sorting cart items
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Export ng Cart model
// Ito ang gagamitin sa controllers / routes para mag-create, read, update, delete ng cart data
module.exports = mongoose.model("Cart", CartSchema);
