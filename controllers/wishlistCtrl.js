// const asyncHandler = require('express-async-handler')
// const Wishlist = require('../models/wishlistModel');



// const getWishlist = asyncHandler(async (req, res) => {
//     const { user, wishes } = req.body;
//     // check if user already exists by checking user
//     const wishlistExists= await Wishlist.findOne({ user })
//     if(wishlistExists) {
//         return wishes
//     };

// // CREATE
//     // if wishlist does not exist create wishlist in DB
//     const wishlist = await Wishlist.create({
//         user,
//         wishes
//     });
//     // once user is created return success with DB assigned ID
//     if(user){
//         res.status(201).json({ // successful
//             _id: wishlist._id,
//             username: wishlist.user,
//             wishes: wishlist.wishes,
//         });
//     } else {
//         res.status(400) // not successful
//         throw new Error('Wishlist Sever Error')
//     };
// });







// module.exports = { getWishlist };