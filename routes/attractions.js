const express = require('express');
const router = express.Router();
const { getLocalAttractions } = require('../controllers/attractions');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

router.get('/:city/:type', async (req, res) => {
  try {
    const city = capitalize(req.params.city);
    const attractionType = req.params.type;

    const attractions = await getLocalAttractions(city, attractionType);

    res.json({ status: true, message: 'Success', data: attractions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
