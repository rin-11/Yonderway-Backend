const mongoose = require('mongoose');
require('dotenv').config(); // Import dotenv to handle environmental variables
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Import the Hotel and Restaurant model
const { Hotel, Restaurant } = require('../utils/database');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
    // restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }]
  }]
}, { timestamps: true });

// Add a method to the user schema to match the password entered during login with the hashed password in the database
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Add a pre-hook to the user schema to encrypt the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt
});

// Create the User model from the user schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
