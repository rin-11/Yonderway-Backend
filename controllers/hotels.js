const { Hotel } = require('../utils/database'); // Import the Hotel model
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
require('dotenv').config();

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


exports.addToWishlist = asyncHandler(async (req, res) => {
  try {
  const hotel = await Hotel.findOne({
    name: req.params.name
  });
  const user = await User.findOne({
    username: req.params.username
  });
  const inWishlist = user.wishlist.hotels.find((hotel) === Hotel);
  if (inWishlist) {
    return User.findByIdAndDelete(_id, 
      {
      $pull: {hotels: hotel}
    }, {
      new: true,
    })
  } else {
    return User.findByIdAndUpdate(_id, 
      {
      $push: {hotels: hotel}
    },
    {
      new: true,
    })
  }
  res.json(user);
} catch (error){
  console.error(error);
}
})
// } else { 



// }
//     user.wishlist.push(hotel);
//     await user.save();
//     res.status(201).json({ hotels: hotel });
//   } catch (error) {
//     console.error(error);
//   }
// });
