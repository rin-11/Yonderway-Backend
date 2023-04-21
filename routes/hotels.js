// Import the required modules
const express = require('express');
const router = express.Router();
const { getHotelData } = require('../controllers/hotels');
const Hotel = require('../models/Hotel'); // Import the Hotel model

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// Define a route that retrieves hotel data for a given city
router.get('/:city', async (req, res) => {
  try {
    // Call the getHotelData function with the specified city as a parameter
    const cityName = capitalizeFirstLetter(req.params.city); // Capitalize the first letter of the city name
    const hotels = await getHotelData(cityName);

    // Slice the hotels array to return only the first 4 results
    const limitedHotels = hotels.slice(0, 4);

    // Send a JSON response with the retrieved hotel data
    res.json({ status: true, message: 'Success', data: limitedHotels });
  } catch (error) {
    // Log any errors that occur during the request or data retrieval
    console.error(error);

    // Send an error response with a 500 status code and message
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Export the router
module.exports = router;
