// Import the axios module
const axios = require('axios');

// Define a function that retrieves local attractions for a given city and attraction type
const getLocalAttractions = async (city, attractionType) => {
  try {
    // Make a GET request to the Google Geocoding API to retrieve the latitude and longitude of the city
    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      // Set the query parameters for the request
      params: {
        address: city, // Specify the city to geocode
        key: process.env.GOOGLE_KEY, // Set the API key as an environment variable
      },
    });

    // Extract the latitude and longitude from the geocoding response data
    const location = geocodeResponse.data.results[0].geometry.location;

    // Make a GET request to the Google Places API to retrieve nearby attractions
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      // Set the query parameters for the request
      params: {
        location: `${location.lat},${location.lng}`, // Specify the location to search near
        radius: 5000, // Set the search radius to 5000 meters
        type: attractionType, // Specify the type of attraction to search for
        key: process.env.GOOGLE_KEY, // Set the API key as an environment variable
      },
    });

    // Extract relevant attraction information from the response data using the map function
    const attractions = response.data.results.map((attraction) => {
      return {
        name: attraction.name, // Attraction name
        rating: attraction.rating, // Attraction rating
        description: attraction.vicinity, // Attraction address
        photo: attraction.photos ? attraction.photos[0].photo_reference : '', // Attraction photo reference (if available)
      };
    });

    // Return the extracted attraction data
    return attractions;
  } catch (error) {
    // Log any errors that occur during the request or data extraction
    console.error(error);
  }
};

// Export the getLocalAttractions function
module.exports = { getLocalAttractions };
