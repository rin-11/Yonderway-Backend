

const asyncHandler = require('express-async-handler');

// Import all the models where get ID required
const User = require('../models/userModel');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Wishlist = require('../models/wishlistModel');

// create user ID using jsonwebtoke and store
const token = require('jsonwebtoken');
const genToken = (id) => {
    return token.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'});
};

    

// get wishlist ID 
const getWishlistId = async (req, res, next) => {
	try {
        // search for wishlist ID
		const wishlist = await Wishlist.findById(req.userId);
        // if wishlist ID is not found create ID
		if (!wishlist) {
			const userWishlist = new Wishlist({
				_id: req.userId,
			});
			await userWishlist.save();
			return res.json({ response: userWishlist.wishlistItems });
		}
		req.wishlist = wishlist;
		next();
    } catch (err) {
        console.error(error);
        res.status(500).json({ message: 'Wishlsit Error' });
        }
};

// get hotel ID 


// get restaurant ID


module.exports = { genToken, getWishlistId } // add getHotelID and getRestaurantID