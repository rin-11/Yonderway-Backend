const axios = require('axios');
const { Restaurant } = require('../utils/database');

exports.getRestaurantData = async (city) => {
  try {
    const existingRestaurantData = await Restaurant.findOne({ city });

    if (existingRestaurantData) {
      return existingRestaurantData.restaurants;
    }

    const restaurants = await getRestaurantDataFromGoogle(city);

    const newRestaurantData = new Restaurant({ city, restaurants });
    await newRestaurantData.save();

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

const getRestaurantDataFromGoogle = async (city) => {
  try {
    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: city,
        key: process.env.GOOGLE_GEOCODE_KEY,
      },
    });

    const location = geocodeResponse.data.results[0].geometry.location;

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${location.lat},${location.lng}`,
        radius: 5000,
        type: 'restaurant',
        key: process.env.GOOGLE_KEY,
      },
    });

    const restaurants = response.data.results.map((restaurant) => {
      const photoUrl = restaurant.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.GOOGLE_KEY}`
        : '';

      return {
        name: restaurant.name,
        rating: restaurant.rating,
        description: restaurant.vicinity,
        photo: photoUrl,
      };
    });

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};
