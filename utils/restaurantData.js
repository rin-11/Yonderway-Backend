// Import the axios module
const axios = require('axios');

// Define a function that retrieves a list of nearby restaurants for a given city
const getRestaurantData = async (city) => {
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

    // Make a GET request to the Google Places API to retrieve nearby restaurants
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      // Set the query parameters for the request
      params: {
        location: `${location.lat},${location.lng}`, // Specify the location to search near
        radius: 5000, // Set the search radius to 5000 meters
        type: 'restaurant', // Use 'restaurant' type for restaurants
        key: process.env.GOOGLE_KEY, // Set the API key as an environment variable
        limit: 4, // Set the limit of results to 4
      },
    });

    // Extract relevant restaurant information from the response data using the map function
    const restaurants = response.data.results.map((restaurant) => {
      return {
        name: restaurant.name, // Restaurant name
        rating: restaurant.rating, // Restaurant rating
        description: restaurant.vicinity, // Restaurant address
        photo: restaurant.photos ? restaurant.photos[0].photo_reference : '', // Restaurant photo reference (if available)
      };
    });

    // Return the extracted restaurant data
    return restaurants;
  } catch (error) {
    // Log any errors that occur during the request or data extraction
    console.error(error);
  }
};

// Export the getRestaurantData function
module.exports = { getRestaurantData };
