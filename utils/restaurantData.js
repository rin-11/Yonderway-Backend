const axios = require('axios');

const getLocalRestaurants = async (city) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `restaurants in ${city}`,
        key: process.env.GOOGLE_KEY,
      },
    });

    const restaurants = response.data.results.map((restaurant) => {
      return {
        name: restaurant.name,
        rating: restaurant.rating,
        description: restaurant.formatted_address,
        photo: restaurant.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.GOOGLE_KEY}` : '',
      };
    });

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getLocalRestaurants };
