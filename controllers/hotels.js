const hotelData = require('../utils/hotelData');
const { Hotel } = require('../utils/database'); // Import the Hotel model

exports.getHotelData = async (city) => {
  try {
    const existingHotelData = await Hotel.findOne({ city });

    if (existingHotelData) {
      return existingHotelData.hotels;
    }

    const hotels = await hotelData.getHotelData(city);

    const newHotelData = new Hotel({ city, hotels });
    await newHotelData.save();

    return hotels;
  } catch (error) {
    console.error(error);
  }
};
