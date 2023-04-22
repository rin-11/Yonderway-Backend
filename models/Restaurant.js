// Import Mongoose for schema creation
const mongoose = require('mongoose');

// Define the restaurant schema using Mongoose's Schema class
const RestaurantSchema = new mongoose.Schema({
  city: { type: String, unique: true }, // The city the restaurants are located in
  restaurants: [ // An array of restaurant objects
    {
      name: String, // The name of the restaurant
      rating: Number, // The restaurant's rating (1-5)
      description: String, // A description of the restaurant
      photo: String // A URL for a photo of the restaurant
    }
  ]
});

// Compile the schema into a model using Mongoose's model method
const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

// Export the Restaurant model
module.exports = Restaurant;
