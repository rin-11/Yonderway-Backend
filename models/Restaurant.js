const mongoose = require('mongoose');

// Check if the Restaurant model has already been defined
// and use the existing model if it has
module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', new mongoose.Schema({
  name: String,
  city: String,
  restaurants: [
    {
      name: String,
      rating: Number,
      description: String,
      photo: String
    }
  ]
}));
