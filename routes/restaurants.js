const express = require('express');
const router = express.Router();
const { getRestaurantData } = require('../utils/restaurantData'); // Import the getRestaurantData function

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Define a route that retrieves restaurant data for a given city
router.get('/:city', async (req, res) => {
  try {
    const cityName = capitalizeFirstLetter(req.params.city); // Capitalize the first letter of the city name
    const restaurants = await getRestaurantData(cityName); // Call the getRestaurantData function with the specified city as a parameter

    const slicedRestaurants = restaurants.slice(0, 4); // Slice the restaurants array to return only the first 4 results

    // Send a JSON response with the retrieved restaurant data
    res.json({ status: true, message: 'Success', data: slicedRestaurants });
  } catch (error) {
    // Log any errors that occur during the request or data retrieval
    console.error(error);

    // Send an error response with a 500 status code and message
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
