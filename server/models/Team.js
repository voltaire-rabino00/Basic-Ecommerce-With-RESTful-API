const mongoose = require("mongoose");

// TeamSchema
// Ito ang schema para sa team members ng application
// Ginagamit ito para i-store ang profiles ng team (About Us / Team page)
const teamSchema = new mongoose.Schema(
  {
    // name
    // Buong pangalan ng team member
    name: { 
      type: String, 
      required: true 
    },

    // role
    // Position o role ng team member sa organization
    role: { 
      type: String, 
      required: true 
    },

    // description
    // Short bio o description ng team member
    description: { 
      type: String, 
      required: true 
    },

    // email
    // Email address ng team member
    // Pwedeng gamitin for contact or internal reference
    email: { 
      type: String, 
      required: true 
    },

    // image
    // Image URL or file path ng profile picture
    image: { 
      type: String, 
      required: true 
    }
  },
  {
    // timestamps
    // Auto-generated fields: createdAt at updatedAt
    // Useful for tracking profile updates
    timestamps: true
  }
);

// Export ng Team model
// Ginagamit ito sa controllers para sa CRUD operations ng team members
module.exports = mongoose.model("Team", teamSchema);
