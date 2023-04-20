const express = require('express');
const router = express.Router();
const { getRestaurantData } = require('../controllers/restaurants');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

router.get('/:city', async (req, res) => {
  try {
    const city = capitalizeFirstLetter(req.params.city);
    const restaurants = await getRestaurantData(city);

    res.json({ status: true, message: 'Success', data: restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
