const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getWishlist } = require('../controllers/userCtrl');
const { addToWishlist } = require('../controllers/hotels');
const { genToken } = require('../utils/userMiddleware');

// User Register/Login routes
router.post('/register', registerUser); // Register new user
router.post('/login', loginUser); // User login

// User Wishlist Routes
router.get('/wishlist', getWishlist); // Get user wishlist
router.put('/wishlist', addToWishlist, genToken); // Update or delete user wishlist

module.exports = router;

