// Import the required utility functions for retrieving and processing destination data
const { getRandomDestinations, getDestinationPhotos } = require('../utils/destinationData');

// Define an asynchronous function for retrieving random destinations and their photos
const getDestinations = async (req, res) => {
  try {
    // Call the getRandomDestinations and getDestinationPhotos functions to retrieve and process destination data
    const destinations = await getRandomDestinations();
    const photos = await getDestinationPhotos(destinations);

    // Return a JSON response with the destinations and their photos data
    res.json({ destinations, photos });
  } catch (error) {
    // Log any errors to the console and return a 500 error response
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Define an asynchronous function for retrieving random destination photos
const getRandomPhotos = async (req, res) => {
  try {
    // Call the getRandomDestinations and getDestinationPhotos functions to retrieve and process destination data
    const destinations = await getRandomDestinations();
    const photos = await getDestinationPhotos(destinations);

    // Return a JSON response with the destination photos data
    res.json({ photos });
  } catch (error) {
    // Log any errors to the console and return a 500 error response
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export the two functions for use in the destinations router module
module.exports = {
  getDestinations,
  getRandomPhotos,
};
