
// const Wishlist = require('../models/wishlistModel');
const load = require('lodash'); // for loading arrays easier for DB

// get wishlist items
const getWishlistData = async (req, res) => {
    const { wishlist } = req;
	try {
		await wishlist.populate('wishlistData.hotel').execPopulate();
		res.json({ response: wishlist.wishlistData });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

// add hotel wishlist items
const addHotelWish = async (req, res) => {
    const { hotelId } = req.params;
	const { wishlist } = req;
	try {
		if (!wishlist.wishlistItems.id(hotelId)) {
			const addToWishlist = load.extend(wishlist, {
				wishlistData: load.concat(wishlist.wishlistData, {
					_id: hotelId,
					hotel: hotelId,
				}),
			});
			await addToWishlist.save();
			await addToWishlist
				.populate('wishlistData.hotel')
				.execPopulate();
			res.json({ response: addToWishlist.wishlistData });
		} else throw Error('This hotel is already in the wishlist');
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

// add restaurant wishlist items
const addRestaurantWish = async (req, res) => {
    const { restaurantId } = req.params;
	const { wishlist } = req;
	try {
		if (!wishlist.wishlistItems.id(restaurantId)) {
			const addToWishlist = load.extend(wishlist, {
				wishlistData: load.concat(wishlist.wishlistData, {
					_id: restaurantId,
					restaurant: restaurantId,
				}),
			});
			await addToWishlist.save();
			await addToWishlist
				.populate('wishlistData.restaurant')
				.execPopulate();
			res.json({ response: addToWishlist.wishlistData });
		} else throw Error('This restaurant is already in the wishlist');
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

// delete hotel wishlist items
const deleteHotelWish = async (req, res) => {
    const { hotelId  } = req.params;
	const { wishlist } = req;
	try {
		await wishlist.wishlistData.id(hotelId).remove();
		await wishlist.save();
		await wishlist.populate('wishlistData.hotel').execPopulate();
		res.json({ response: wishlist.wishlistData });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};
// delete restaurant wishlist items
const deleteRestaurantWish = async (req, res) => {
    const { restaurantId  } = req.params;
	const { wishlist } = req;
	try {
		await wishlist.wishlistData.id(restaurantId).remove();
		await wishlist.save();
		await wishlist.populate('wishlistData.restaurant').execPopulate();
		res.json({ response: wishlist.wishlistData });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

// module exports
module.exports = { getWishlistData, addHotelWish, addRestaurantWish, deleteHotelWish, deleteRestaurantWish };