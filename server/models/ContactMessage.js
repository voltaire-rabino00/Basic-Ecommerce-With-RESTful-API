const mongoose = require("mongoose");

// ContactMessageSchema
// Ito ang schema para sa "Contact Us" messages ng users
// Ginagamit ito para i-store ang mga inquiries, feedback, or concerns
const ContactMessageSchema = new mongoose.Schema({

    // name
    // Pangalan ng user na nag-submit ng contact form
    name: { 
        type: String, 
        required: true 
    },

    // email
    // Email address ng user
    // Ginagamit para sa replies or follow-up communication
    email: { 
        type: String, 
        required: true 
    },

    // message
    // Actual na mensahe o concern ng user
    message: { 
        type: String, 
        required: true 
    }

}, { 
    // timestamps
    // Auto-generated fields: createdAt at updatedAt
    // Helpful for tracking kung kailan na-submit ang message
    timestamps: true 
});

// Export ng ContactMessage model
// Ito ang gagamitin sa controllers para mag-save at mag-fetch ng contact messages
module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
