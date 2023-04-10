// Import the getLocalAttractions function from the attractionsData module
const attractionData = require('../utils/attractionsData');

// Define an asynchronous function that accepts a city and attraction type parameter and returns a list of local attractions
exports.getLocalAttractions = async (city, attractionType) => {
  try {
    // Call the getLocalAttractions function with the provided city and attraction type parameters
    const attractions = await attractionData.getLocalAttractions(city, attractionType);

    // Return the list of attractions
    return attractions;
  } catch (error) {
    // Log any errors to the console and return null
    console.error(error);
    return null;
  }
};
