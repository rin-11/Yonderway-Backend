const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  restaurants: [
    {
      name: String,
      rating: Number,
      description: String,
      photo: String,
    },
  ],
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
