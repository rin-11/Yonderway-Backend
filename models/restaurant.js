const mongoose = require('mongoose');

// Define the schema for the Restaurant model
const RestaurantSchema = new mongoose.Schema({
  name: String,
  location_id: Number,
  city: String,
  latitude: String,
  longitude: String,
  photo: String,
  rating: Number,
  description: String,
  website: String,
  phone: String,
});

// Export the Restaurant model, which is based on the RestaurantSchema
module.exports = mongoose.model('Restaurants', RestaurantSchema);
