// Import the hotelData utility module
const hotelData = require('../utils/hotelData');

// Define an asynchronous function for retrieving hotel data for a given city
exports.getHotelData = async (city) => {
  try {
    // Call the getHotelData function from the hotelData module with the provided city parameter
    const hotels = await hotelData.getHotelData(city);

    // Return the retrieved hotel data
    return hotels;
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
};
