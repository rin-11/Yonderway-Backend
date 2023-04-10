// Import the restaurantData utility module
const restaurantData = require('../utils/restaurantData');

// Define the getRestaurantData controller function
exports.getRestaurantData = async (city) => {
  try {
    // Call the restaurantData utility function to get restaurant data for the provided city
    const restaurants = await restaurantData.getRestaurantData(city);

    // Return the restaurant data
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};
