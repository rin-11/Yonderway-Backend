const asyncHandler = require('express-async-handler')
const Wishlist = require('../models/wishlistModel');







module.exports = { findUserID, addToWishlist, deleteFromWishlist };