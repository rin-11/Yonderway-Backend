const hotelData = require('../utils/hotelData');
const { Hotel } = require('../utils/database'); // Import the Hotel model
const asyncHandler = require('express-async-handler')


const User = require('../models/userModel');
const { genToken } = require('../utils/userMiddleware');

exports.getHotelData = async (city) => {
  try {
    const existingHotelData = await Hotel.findOne({ city });

    if (existingHotelData) {
      return existingHotelData.hotels;
    }

    const hotels = await hotelData.getHotelData(city);

    const newHotelData = new Hotel({ city, hotels });
    await newHotelData.save();

    return hotels;
  } catch (error) {
    console.error(error);
  }
};

// exports.addToWishlist = asyncHandler(async (req, res) => {
//   const { _id } = req.body; // find user ID
//   const { hotelId } = req.body; // find hotel data
  
//   try {

//     // find user
//     const user = User.findbyID(_id);

//     // check if hotel is already in the wishlist
//     const inWishlist = user.wishlist.hotels.find((id) => id.toString() === hotelId);
//     if(inWishlist) {
//       let user = await User.findByIdAndDelete(_id, 
//         {
//         $pull: {hotels: hotelId}
//       }, {
//         new: true,
//       })
//     } else {
//       let user = await User.findByIdAndUpdate(_id, 
//         {
//         $push: {hotels: hotelId}
//       },
//       {
//         new: true,
//       })
//     }
//     res.json(user);
//   } catch (error){
//     console.error(error);
//   }
// })
