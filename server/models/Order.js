const mongoose = require("mongoose");

// OrderSchema
// Ito ang schema para sa orders ng users
// Ginagamit ito para mag-record ng product na na-order
const OrderSchema = new mongoose.Schema({

    // productId
    // Reference sa Product collection
    // Ipinapakita kung anong product ang na-order
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },

    // date
    // Petsa kung kailan ginawa ang order
    // Default ay current date/time
    date: { 
        type: Date, 
        default: Date.now 
    }
});

// Export ng Order model
// Ito ang gagamitin sa controllers para mag-save at mag-fetch ng order records
module.exports = mongoose.model("Order", OrderSchema);
