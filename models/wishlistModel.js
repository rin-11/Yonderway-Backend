const mongoose = require('mongoose');

// child schema to pull hotel data and restaurant data into wishlist
const wishlistDataSchema = new mongoose.Schema({
    hotel : {type: mongoose.Schema.Types.ObjectId, ref: "Hotel"},
    restaurant : {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
});


const wishlistSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    wishlistData: [wishlistDataSchema] 
},
    { timestamps: true }
);


const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
