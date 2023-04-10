const axios = require('axios');

const getRestaurantData = async (city) => {
  try {
    // Make a GET request to the Google Places API with the provided city name and Google API key
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `restaurants in ${city}`,
        key: process.env.GOOGLE_KEY
      }
    });

    // Map through the response data and extract relevant restaurant information
    const restaurants = response.data.results.map((restaurant) => {
      return {
        name: restaurant.name,
        rating: restaurant.rating,
        description: restaurant.formatted_address,
        photo: restaurant.photos ? restaurant.photos[0].photo_reference : '' // Get the photo reference if available
      };
    });

    // Return the extracted restaurant data
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

// Export the getRestaurantData function
module.exports = { getRestaurantData };
