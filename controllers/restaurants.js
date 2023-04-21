const { getLocalRestaurants } = require("../utils/restaurantData");
const Restaurant = require("../models/Restaurant");

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getRestaurants = async (req, res) => {
  try {
    const city = capitalizeFirstLetter(req.params.city);

    const restaurants = await getLocalRestaurants(city);

    // Save the restaurants array to the database
    const existingCity = await Restaurant.findOne({ city });
    if (existingCity) {
      existingCity.restaurants = restaurants;
      await existingCity.save();
    } else {
      const newCity = new Restaurant({ city, restaurants });
      await newCity.save();
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRestaurants,
};
