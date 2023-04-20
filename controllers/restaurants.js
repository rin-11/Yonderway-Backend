// const Restaurant = require('../models/Restaurant');
const restaurantData = require('../utils/restaurantData');

exports.getRestaurantData = async (city) => {
  try {
    // Commenting out database code for now
    // const existingRestaurants = await Restaurant.find({ city });
    //
    // if (existingRestaurants.length > 0) {
    //   return existingRestaurants;
    // }

    const restaurants = await restaurantData.getRestaurantData(city);

    // Commenting out database code for now
    // const savedRestaurants = await Restaurant.insertMany(restaurants.map((restaurant) => ({
    //   ...restaurant,
    //   city
    // })));
    //
    // return savedRestaurants;

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};
