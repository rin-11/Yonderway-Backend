// routes/hotels.js
const express = require('express');
const router = express.Router();
const { getHotelData } = require('../controllers/hotels');

router.get('/:city', async (req, res) => {
  try {
    const hotels = await getHotelData(req.params.city);
    res.json({ status: true, message: 'Success', data: hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
