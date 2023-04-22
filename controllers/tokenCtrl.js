

const asyncHandler = require('express-async-handler');

// Import all the models where get ID required
const User = require('../models/userModel');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Wishlist = require('../models/wishlistModel');

// Use JWT Token to send user auth token from backend to frontend
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
			return res.json({ response: userWishlist.wishlistData });
		}
		req.wishlist = wishlist;
		next();
    } catch (err) {
        console.error(error);
        res.status(500).json({ message: 'Wishlist Error' });
        }
};

// get hotel ID 
const getHotelId = async (req, res, next, id) => {
	await Hotel.findById(id).exec((err, hotel) => {
		if (err) {
			res.status(400).json({
				message: 'Hotel not found',
			});
		}
		req.hotel = hotel;
		next();
	});
};

// get restaurant ID
const getRestaurantId = async (req, res, next, id) => {
	await Restaurant.findById(id).exec((err, restaurant) => {
		if (err) {
			res.status(400).json({
				message: 'Restaurant not found',
			});
		}
		req.restaurant = restaurant;
		next();
	});
};

module.exports = { genToken, getWishlistId, getHotelId, getRestaurantId } 