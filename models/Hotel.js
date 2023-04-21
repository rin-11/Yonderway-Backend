const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  city: String,
  hotels: [
    {
      name: String,
      rating: Number,
      description: String,
      photo: String
    }
  ]
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;
