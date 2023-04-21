const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getWishlist } = require('../controllers/userCtrl');
const { addToWishlist } = require('../controllers/hotels');
const { genToken } = require('../utils/userMiddleware');

// User Register/Login routes
    router.route('/').post(registerUser);
    router.route('/login').post(loginUser);



// User Wishlist Routes

    // Show (GET) User Wishlist
    router.get('/wishlist', getWishlist);
    // Update (PUT) or (DELETE) from User Wishlist
    router.put('/wishlist', addToWishlist, genToken);


module.exports = router;