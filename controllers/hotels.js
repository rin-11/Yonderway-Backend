// controllers/hotels.js
const hotelData = require('../utils/hotelData');

exports.getHotelData = async (city) => {
  try {
    const hotels = await hotelData.getHotelData(city);
    return hotels;
  } catch (error) {
    console.error(error);
  }
};
