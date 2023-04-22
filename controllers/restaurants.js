// Import required modules
const axios = require('axios');
const { Restaurant } = require('../utils/database');

// Define an asynchronous function that retrieves restaurant data for a given city
exports.getRestaurantData = async (city) => {
  try {
    // Try to find restaurant data for the given city in the database
    const existingRestaurantData = await Restaurant.findOne({ city });

    // If restaurant data is found, return the restaurants stored in that document
    if (existingRestaurantData) {
      return existingRestaurantData.restaurants;
    }

    // If no restaurant data is found, retrieve the restaurant data using the `getRestaurantDataFromGoogle` function
    const restaurants = await getRestaurantDataFromGoogle(city);

    // Create a new Restaurant document with the given city and restaurants, and save it in the database
    const newRestaurantData = new Restaurant({ city, restaurants });
    await newRestaurantData.save();

    // Return the retrieved restaurants data
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

// Define an asynchronous function that retrieves restaurant data from the Google Places API for a given city
const getRestaurantDataFromGoogle = async (city) => {
  try {
    // Send a GET request to the Google Geocoding API to retrieve the latitude and longitude of the given city
    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: city,
        key: process.env.GOOGLE_GEOCODE_KEY,
      },
    });

    // Extract the latitude and longitude from the response data
    const location = geocodeResponse.data.results[0].geometry.location;

    // Send a GET request to the Google Places API to retrieve nearby restaurants
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${location.lat},${location.lng}`,
        radius: 5000,
        type: 'restaurant',
        key: process.env.GOOGLE_KEY,
      },
    });

    // Map the restaurant data in the response to a more usable format
    const restaurants = response.data.results.map((restaurant) => {
      // Construct the URL for the restaurant's photo (if available)
      const photoUrl = restaurant.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.GOOGLE_KEY}`
        : '';

      // Return an object containing the restaurant's name, rating, description, and photo (if available)
      return {
        name: restaurant.name,
        rating: restaurant.rating,
        description: restaurant.vicinity,
        photo: photoUrl,
      };
    });

    // Return the mapped restaurant data
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};
