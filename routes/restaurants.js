const express = require('express');
const router = express.Router();
const { getRestaurantData } = require('../controllers/restaurants');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

router.get('/:city', async (req, res) => {
  try {
    const city = capitalize(req.params.city);

    const restaurants = await getRestaurantData(city);

    res.json({ status: true, message: 'Success', data: restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
