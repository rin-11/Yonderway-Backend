// Import required modules
const { Hotel } = require('../utils/database');
const asyncHandler = require('express-async-handler')
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
  try {
    // Retrieve the hotel and user documents using their respective parameters
    const hotel = await Hotel.findOne({ name: req.params.name });
    const user = await User.findOne({ username: req.params.username });

    // Check if the hotel is already in the user's wishlist
    const inWishlist = user.wishlist.hotels.find((hotel) === Hotel);

    // If the hotel is already in the wishlist, remove it
    if (inWishlist) {
      await User.findByIdAndDelete(_id, { $pull: { hotels: hotel } }, { new: true });
    } else {
      // If the hotel is not in the wishlist, add it
      await User.findByIdAndUpdate(_id, { $push: { hotels: hotel } }, { new: true });
    }

    // Return a JSON response with the updated user document
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});
