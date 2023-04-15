// Import the required modules
const express = require('express');
const router = express.Router();
const { getHotelData } = require('../controllers/hotels');

// Define a route that retrieves hotel data for a given city
router.get('/:city', async (req, res) => {
  try {
    // Call the getHotelData function with the specified city as a parameter
    const hotels = await getHotelData(req.params.city);

    // Send a JSON response with the retrieved hotel data
    res.json({ status: true, message: 'Success', data: hotels });
  } catch (error) {
    // Log any errors that occur during the request or data retrieval
    console.error(error);

    // Send an error response with a 500 status code and message
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
