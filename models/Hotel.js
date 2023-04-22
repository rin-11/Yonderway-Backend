// Import Mongoose for schema creation
const mongoose = require('mongoose');

// Define the hotel schema using Mongoose's Schema class
const HotelSchema = new mongoose.Schema({
  city: String, // The city the hotel is located in
  hotels: [ // An array of hotel objects
    {
      name: String, // The name of the hotel
      rating: Number, // The hotel's rating (1-5)
      description: String, // A description of the hotel
      photo: String // A URL for a photo of the hotel
    }
  ]
});

// Compile the schema into a model using Mongoose's model method
const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);

// Export the Hotel model
module.exports = Hotel;
