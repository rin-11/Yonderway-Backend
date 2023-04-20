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

    // Send a JSON response with the retrieved hotel data
    res.json({ status: true, message: 'Success', data: hotels });
  } catch (error) {
    // Log any errors that occur during the request or data retrieval
    console.error(error);

    // Send an error response with a 500 status code and message
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/store', async (req, res) => {
  try {
    const hotelData = req.body;

    // Check if a hotel with the same name and city already exists in the database
    const existingHotel = await Hotel.findOne({ name: hotelData.name, city: hotelData.city });

    if (existingHotel) {
      // If the hotel already exists, send an error response
      res.status(400).json({ message: 'Hotel already exists in the database' });
    } else {
      // If the hotel does not exist, create and save a new hotel
      const hotel = new Hotel(hotelData);
      await hotel.save();
      res.status(201).json({ message: 'Hotel data stored successfully', hotel });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error storing hotel data', error });
  }
});

// Export the router
module.exports = router;
