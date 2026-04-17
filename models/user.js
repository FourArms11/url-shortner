const mongoose = require('mongoose');

// A Schema defines the blueprint (structure) of every User document inside the MongoDB database.
const userSchema = new mongoose.Schema({
    name: {
        type: String, // Value must be text
        required: true, // You cannot create a user without a name
    },
    email: {
        type: String,
        required: true,
        unique: true, // No two people can have the EXACT same email in the database
    },
    password: {
        type: String, // We save passwords as text. (In a real app, you should 'hash' this for security!)
        required: true,
    },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' timestamp fields whenever a user is made/edited

// Compile the blueprint into an active Mongoose model
const User = mongoose.model('user', userSchema);

module.exports = User;
