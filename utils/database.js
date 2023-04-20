const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

function connect() {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connection Events
  mongoose.connection
    .on("open", () => console.log("connected to the DB"))
    .on("close", () => console.log("disconnected from the DB"))
    .on("error", (error) => console.log(error));
};


// Define the schema for the Restaurant model
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

// Export the Restaurant model, which is based on the RestaurantSchema
module.exports = { connect, Restaurant: mongoose.model('Restaurant', RestaurantSchema) };
