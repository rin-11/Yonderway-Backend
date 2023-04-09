const express = require('express');
const router = express.Router();
const { getDestinationRestaurants } = require('../utils/destinationData');

// Define a GET route with a city parameter for retrieving restaurants near the city
router.get('/:city', async (req, res) => {
  try {
    // Call the getDestinationRestaurants function with the provided city parameter
    const restaurants = await getDestinationRestaurants(req.params.city);

    // Return a JSON response with the restaurants data
    res.json({ status: true, message: 'Success', data: restaurants });
  } catch (error) {
    // Log any errors to the console and return a 500 error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router for use in other modules
module.exports = router;
