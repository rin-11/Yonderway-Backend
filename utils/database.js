// Import the required modules
const mongoose = require('mongoose');
require('dotenv').config();

// Define the connect function to establish a connection to the database
function connect() {
  const uri = process.env.MONGODB_URI; // Retrieve the MongoDB connection URI from the environment variables
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to the database using the URI and options

  // Set up event listeners for the database connection
  mongoose.connection
    .on('open', () => console.log('Connected to the database')) // Log a message when the connection is established
    .on('close', () => console.log('Disconnected from the database')) // Log a message when the connection is closed
    .on('error', (error) => console.log(`Database error: ${error.message}`)); // Log an error message if an error occurs during the connection
}

// Define the HotelSchema for the hotel collection in the database
const HotelSchema = new mongoose.Schema({
  name: String, // Hotel name
  city: String, // City where the hotel is located
  hotels: [
    {
      name: String, // Hotel name
      rating: Number, // Hotel rating
      description: String, // Hotel description
      photo: String // URL of the hotel photo
    }
  ]
});

// Export the connect function and the Hotel model
exports.connect = connect;
exports.Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);
