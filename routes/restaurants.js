const express = require('express');
const router = express.Router();
const { getRestaurantData } = require('../utils/restaurantData');

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

router.get('/:city', async (req, res) => {
  try {
    const cityName = capitalizeFirstLetter(req.params.city);
    const restaurants = await getRestaurantData(cityName);

    const slicedRestaurants = restaurants.slice(0, 4); // Limit the results to 4

    res.json({ status: true, message: 'Success', data: slicedRestaurants });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
