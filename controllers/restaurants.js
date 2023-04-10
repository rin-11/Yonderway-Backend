const Restaurant = require('../models/restaurant');
const restaurantData = require('../utils/restaurantData');

exports.getRestaurantData = async (city) => {
  try {
    const restaurants = await restaurantData.getRestaurantData(city);

    // Create a new restaurant object to save in the database
    const restaurant = new Restaurant({
      name: city,
      city: city,
      restaurants: restaurants
    });

    // Save the restaurant in the database
    await restaurant.save();

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};
