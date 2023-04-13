const axios = require('axios');

const getLocalAttractions = async (city, attractionType) => {
  try {
    // Make a GET request to the Google Places API with the provided city name and attraction type
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: `${attractionType} in ${city}`,
        key: process.env.GOOGLE_KEY
      }
    });

    // Map through the response data and extract relevant attraction information
    const attractions = response.data.results.map((attraction) => {
      return {
        name: attraction.name,
        rating: attraction.rating,
        description: attraction.formatted_address,
        photo: attraction.photos ? attraction.photos[0].photo_reference : '' // Get the photo reference if available
      };
    });

    // Return the extracted attraction data
    return attractions;
  } catch (error) {
    console.error(error);
  }
};

// Export the getLocalAttractions function
module.exports = { getLocalAttractions };
