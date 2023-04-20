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

// Define the schema for the Hotel model
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

module.exports = {
  connect,
  Restaurant: mongoose.model('Restaurant', RestaurantSchema),
  Hotel: mongoose.model('Hotel', HotelSchema) // Export the Hotel model
};
