// Import required modules
const { Hotel } = require('../utils/database');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
require('dotenv').config();

// Import user-related modules
const User = require('../models/userModel');
const { genToken } = require('../utils/userMiddleware');

// Define an asynchronous function that retrieves hotel data for a given city
exports.getHotelData = async (city) => {
  try {
    // Try to find hotel data for the given city in the database
    const existingHotelData = await Hotel.findOne({ city });

    // If hotel data is found, return the hotels stored in that document
    if (existingHotelData) {
      return existingHotelData.hotels;
    }

    // If no hotel data is found, retrieve the hotel data using the `hotelData` module
    const hotels = await hotelData.getHotelData(city);

    // Create a new Hotel document with the given city and hotels, and save it in the database
    const newHotelData = new Hotel({ city, hotels });
    await newHotelData.save();

    // Return the retrieved hotels data
    return hotels;
  } catch (error) {
    console.error(error);
  }
};

// Define an asynchronous function that handles adding a hotel to a user's wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.body; // find user ID
  const { hotelId } = req.body; // find hotel data

  try {
    // find user
    const user = User.findbyID(_id);

    // check if hotel is already in the wishlist
    const inWishlist = user.wishlist.hotels.find((id) => id.toString() === hotelId);
    if (inWishlist) {
      let user = await User.findByIdAndUpdate(_id, {
        $pull: { hotels: hotelId },
      }, {
        new: true,
      });
    } else {
      let user = await User.findByIdAndUpdate(_id, {
        $push: { hotels: hotelId },
      }, {
        new: true,
      });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

