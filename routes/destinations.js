const express = require('express');
const destinationsController = require('../controllers/destinations');
const router = express.Router();

router.get('/', destinationsController.getDestinations);
router.get('/random-photos', destinationsController.getRandomPhotos);


module.exports = router;
