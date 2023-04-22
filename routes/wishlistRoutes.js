const express = require('express');
const router = express.Router();

const { genToken, getWishlistId} = require ('../controllers/tokenCtrl');
const { getWishlistData, addHotelWish, addRestaurantWish, deleteHotelWish, deleteRestaurantWish } = require('../controllers/wishlistCtrl');

    // get wishlist by user ID
    router.get('/', genToken, getWishlistData, getWishlistId);

    // add to wishlist by ID
    router.post(':/Id', genToken, addHotelWish, addRestaurantWish, getWishlistId)

    // delete from wishlist by ID
    router.delete(':/Id', genToken, deleteHotelWish, deleteRestaurantWish, getWishlistId);

module.exports = router;
