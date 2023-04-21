const restaurantData = require('../utils/restaurantData');
const Restaurant = require('../models/Restaurant');

exports.getRestaurantData = async (city) => {
  const restaurant = await Restaurant.findOne({ city });

  if (restaurant) {
    return restaurant.restaurants;
  } else {
    const restaurants = await restaurantData.getRestaurantData(city);
    await saveRestaurants(city, restaurants);
    return restaurants;
  }
};

const saveRestaurants = async (city, restaurants) => {
  const newRestaurant = new Restaurant({
    city,
    restaurants,
  });
  await newRestaurant.save();
};
