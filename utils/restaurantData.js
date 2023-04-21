const axios = require('axios');

const getRestaurantData = async (city) => {
  try {
    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: city,
        key: process.env.GOOGLE_KEY,
      },
    });

    const location = geocodeResponse.data.results[0].geometry.location;

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${location.lat},${location.lng}`,
        radius: 5000,
        type: 'restaurant', // Use 'restaurant' type for restaurants
        key: process.env.GOOGLE_KEY,
        limit: 4,
      },
    });

    const restaurants = response.data.results.map((restaurant) => {
      return {
        name: restaurant.name,
        rating: restaurant.rating,
        description: restaurant.vicinity,
        photo: restaurant.photos ? restaurant.photos[0].photo_reference : '',
      };
    });

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getRestaurantData };
