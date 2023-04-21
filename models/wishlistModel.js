const mongoose = require('mongoose')
const User = require('./userModel')
const Hotel = require('./Hotel')
const Attraction = require('./Attraction')
const Restaurant = require('./Restaurant')

const ObjectID = mongoose.Schema.Types.ObjectId

const wishlistSchema = new mongoose.Schema({
	user: {type: ObjectID, required: true, ref: User},
	wishes: [{
            hotels: [{
                hotel: {type: ObjectID, ref: Hotel},
            }],
            attratctions: [{
                attraction: {type: ObjectID, ref: Attraction},
            }],
            restaurants: [{
                restaurant: {type: ObjectID, ref: Restaurant},
            }]
        }]
    });

// WishlistModel.find(id).populate('id')

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist;