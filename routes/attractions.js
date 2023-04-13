const express = require('express');
const router = express.Router();
const { getLocalAttractions } = require('../controllers/attractions');

// Define a GET route with a city parameter and attraction type parameter for retrieving local attractions
router.get('/:city/:type', async (req, res) => {
  try {
    // Call the getLocalAttractions function with the provided city and attraction type parameters
    const attractions = await getLocalAttractions(req.params.city, req.params.type);

    // Return a JSON response with the attractions data
    res.json({ status: true, message: 'Success', data: attractions });
  } catch (error) {
    // Log any errors to the console and return a 500 error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router for use in other modules
module.exports = router;
