const mongoose = require('mongoose');


const wishlistSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    // wishlistItems: [wishlistItemsSchema] 
},
    { timestamps: true }
);


// child schema to pull hotel data and restaurant data into wishlist
const wishlistItemsSchema = new mongoose.Schema({
    hotels : {type: mongoose.Schema.Types.ObjectId, ref: "Hotel"},
    restaurants : {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
