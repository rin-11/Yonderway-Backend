const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createWishlist } = require('../controllers/userCtrl');

// API endpoints
router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/wishlist/:userID').post(createWishlist);


module.exports = router;