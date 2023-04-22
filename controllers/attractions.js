// Import the local attractions data module and the Attraction model
const attractionData = require('../utils/attractionsData');
const Attraction = require('../models/Attraction');

// Export an asynchronous function that retrieves the local attractions for a given city and attraction type
exports.getLocalAttractions = async (city, attractionType) => {
  // Try to find an Attraction document in the database that matches the given city and attraction type
  const attraction = await Attraction.findOne({ city, type: attractionType });

  // If an Attraction document is found, return the attractions stored in that document
  if (attraction) {
    return attraction.attractions;
  } else {
    // If no Attraction document is found, retrieve the local attractions data from the external source
    const attractions = await attractionData.getLocalAttractions(city, attractionType);

    // Save the attractions data in the database for future use
    await saveAttractions(city, attractionType, attractions);

    // Return the retrieved attractions data
    return attractions;
  }
};

// Define an asynchronous function that saves the given attractions data in the database
const saveAttractions = async (city, attractionType, attractions) => {
  // Create a new Attraction document with the given city, attraction type, and attractions
  const newAttraction = new Attraction({
    city,
    type: attractionType,
    attractions,
  });

  // Save the new Attraction document in the database
  await newAttraction.save();
};
