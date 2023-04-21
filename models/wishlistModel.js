// const mongoose = require('mongoose')
// const User = require('./userModel')
// const Hotel = require('./Hotel')
// const Attraction = require('./Attraction')
// const Restaurant = require('./Restaurant')

// const wishlistSchema = new mongoose.Schema({
// 	user: {type: mongoose.Schema.Types.ObjectId, ref: User},
//     wishes: [{
//             hotels: [{
//                 hotel: {type: mongoose.Schema.Types.ObjectId, ref: Hotel},
//             }],
//             attratctions: [{
//                 attraction: {type: mongoose.Schema.Types.ObjectId, ref: Attraction},
//             }],
//             restaurants: [{
//                 restaurant: {type: mongoose.Schema.Types.ObjectId, ref: Restaurant},
//             }]
//         }]
//     });

// // WishlistModel.find(id).populate('id')

// const Wishlist = mongoose.model('Wishlist', wishlistSchema)

// module.exports = Wishlist;