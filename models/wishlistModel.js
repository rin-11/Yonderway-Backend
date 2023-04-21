const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
	userId: {type: String, required: true, unique: true},
	wishlistItems: [{
        savedItems: {type: mongoose.Schema.Types.ObjectId, ref: 'apiData', requires: true}
        }]
    });


const User = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist;