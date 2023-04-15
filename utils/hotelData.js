// Import the axios module
const axios = require('axios');

// Define a function that retrieves hotel data for a given city
const getHotelData = async (city) => {
  try {
    // Make a GET request to the Google Places API to retrieve hotel data
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      // Set the query parameters for the request
      params: {
        query: `hotels in ${city}`, // Specify the query as 'hotels in <city>'
        key: process.env.GOOGLE_KEY // Set the API key as an environment variable
      }
    });

    // Extract relevant hotel information from the response data using the map function
    const hotels = response.data.results.map((hotel) => {
      return {
        name: hotel.name, // Hotel name
        rating: hotel.rating, // Hotel rating
        description: hotel.formatted_address, // Hotel address
        photo: hotel.photos ? hotel.photos[0].photo_reference : '' // Hotel photo reference (if available)
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
