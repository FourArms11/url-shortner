const mongoose = require('mongoose');

// Blueprint for every URL saved in the database
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,     // E.g., 'ncZSNMzlR'
        required: true,   // It must exist
        unique: true,     // It must be unique so links don't clash
    },
    redirectURL: {
        type: String,     // E.g., 'https://www.wikipedia.org' (the big clumsy URL)
        required: true,
    },
    visitHistory: [
        // Each time a URL is clicked, we push a new object into this array with the exact Date and Time.
        { timestamp: { type: Number } } 

    ], 
    createdBy: {
        // This is a special relational type. It stores the secret _id of the User who generated this specific URL.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Points back to the 'user' model
    }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' timestamps

// Compile the blueprint into an active Model
const URL = mongoose.model('url', urlSchema);

module.exports = URL;