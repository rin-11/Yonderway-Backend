const axios = require('axios');

const getHotelData = async (city) => {
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
        type: 'lodging', // Use 'lodging' type for hotels
        key: process.env.GOOGLE_KEY,
      },
    });

    const hotels = response.data.results.map((hotel) => {
      return {
        name: hotel.name,
        rating: hotel.rating,
        description: hotel.vicinity,
        photo: hotel.photos ? hotel.photos[0].photo_reference : '',
      };
    });

    return hotels;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getHotelData };
