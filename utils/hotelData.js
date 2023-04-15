// utils/hotelData.js
const axios = require('axios');

const getHotelData = async (city) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `hotels in ${city}`,
        key: process.env.GOOGLE_KEY
      }
    });

    const hotels = response.data.results.map((hotel) => {
      return {
        name: hotel.name,
        rating: hotel.rating,
        description: hotel.formatted_address,
        photo: hotel.photos ? hotel.photos[0].photo_reference : ''
      };
    });

    return hotels;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getHotelData };
