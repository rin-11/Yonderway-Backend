const { getLocalRestaurants } = require("../utils/restaurantData");

const getRestaurants = async (req, res) => {
  try {
    const city = req.params.city;

    const restaurants = await getLocalRestaurants(city);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRestaurants,
};
