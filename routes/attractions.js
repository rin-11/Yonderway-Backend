const express = require('express');
const router = express.Router();
const { getLocalAttractions } = require('../controllers/attractions');

// Helper function to capitalize first letter of each word in a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Route to retrieve local attractions for a given city and attraction type
router.get('/:city/:type', async (req, res) => {
  try {
    // Get the city and attraction type parameters from the URL
    const city = capitalize(req.params.city);
    const attractionType = req.params.type;

    // Call the getLocalAttractions controller function to retrieve the attractions data
    const attractions = await getLocalAttractions(city, attractionType);

    // Limit the results to 4 attractions and return a JSON response with the data
    const slicedAttractions = attractions.slice(0, 4);
    res.json({ status: true, message: 'Success', data: slicedAttractions });
  } catch (error) {
    // Log any errors to the console and return a 500 error response
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
