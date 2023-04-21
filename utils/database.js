const mongoose = require('mongoose');
require('dotenv').config();

function connect() {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection
    .on('open', () => console.log('connected to the DB'))
    .on('close', () => console.log('disconnected from the DB'))
    .on('error', (error) => console.log(error));
}

const RestaurantSchema = new mongoose.Schema({
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
});

const HotelSchema = new mongoose.Schema({
  name: String,
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

exports.connect = connect;
exports.Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
exports.Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);
