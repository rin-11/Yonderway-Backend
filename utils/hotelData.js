// Import the axios module
const axios = require('axios');

// Define a function that retrieves hotel data for a given city
const getHotelData = async (city) => {
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

    // Make a GET request to the Google Places API to retrieve nearby hotels
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      // Set the query parameters for the request
      params: {
        location: `${location.lat},${location.lng}`, // Specify the location to search near
        radius: 5000, // Set the search radius to 5000 meters
        type: 'lodging', // Use 'lodging' type for hotels
        key: process.env.GOOGLE_KEY, // Set the API key as an environment variable
      },
    });

    // Extract relevant hotel information from the response data using the map function
    const hotels = response.data.results.map((hotel) => {
      return {
        name: hotel.name, // Hotel name
        rating: hotel.rating, // Hotel rating
        description: hotel.vicinity, // Hotel address
        photo: hotel.photos ? hotel.photos[0].photo_reference : '', // Hotel photo reference (if available)
      };
    });

    // Return the extracted hotel data
    return hotels;
  } catch (error) {
    // Log any errors that occur during the request or data extraction
    console.error(error);
  }
};

// Export the getHotelData function
module.exports = { getHotelData };
