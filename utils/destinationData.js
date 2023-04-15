// Import the axios module
const axios = require('axios');

// Define a function that retrieves a list of random destinations
const getRandomDestinations = async () => {
  try {
    // Define a list of countries to choose from
    const countries = ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'France', 'Germany', 'Spain', 'Italy', 'United Kingdom', 'Russia', 'India', 'China', 'Japan', 'Australia'];

    // Choose a random country from the list
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];

    // Define different types of places to search for.
    const placeTypes = ['park', 'museum', 'monument', 'beach'];

    // Define an array of promises to retrieve place IDs for each type of place
    const placePromises = placeTypes.map(async (placeType) => {
      // Make a GET request to the Google Places API to retrieve a list of places
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeType)}+in+${encodeURIComponent(randomCountry)}&key=${process.env.GOOGLE_KEY}`);
      const predictions = response.data.results;

      // If no places are found, return null
      if (predictions.length === 0) {
        return null;
      }

      // Choose a random place from the list of places and return its place ID
      const randomPlaceIndex = Math.floor(Math.random() * predictions.length);
      return predictions[randomPlaceIndex].place_id;
    });

    // Wait for all promises to resolve and return the resulting array of place IDs
    const placeIds = await Promise.all(placePromises);
    return placeIds.filter(placeId => placeId !== null);
  } catch (error) {
    // Log any errors that occur during the request or data extraction
    console.error(error);
  }
};

// Define a function that retrieves photos for a list of destinations
const getDestinationPhotos = async (destinations) => {
  try {
    // Define an array of promises to retrieve a photo for each destination
    const photoPromises = destinations.map(async (destinationId) => {
      // Make a GET request to the Google Places API to retrieve details for the destination
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${destinationId}&fields=photos&key=${process.env.GOOGLE_KEY}`);
      console.log(`Response for ${destinationId}:`, response.data);
      const candidate = response.data.result;

      // If no photos are found, return null
      if (!candidate || !candidate.photos || candidate.photos.length === 0) {
        console.log(`No photos for ${destinationId}`);
        return null;
      }
      
      // Choose a random photo from the list of photos and return its URL
      const randomPhotoIndex = Math.floor(Math.random() * candidate.photos.length);
      const photoReference = candidate.photos[randomPhotoIndex].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_KEY}`;
    });

    // Wait for all promises to resolve and return the resulting array of photo URLs
    const photos = await Promise.all(photoPromises);
    console.log('Photos:', photos);
    return photos.filter(photo => photo !== null);
  } catch (error) {
    // Log any errors that occur during the request or data extraction
    console.error(error);
  }
};

// Export the getRandomDestinations and getDestinationPhotos functions

module.exports = {
  getRandomDestinations,
  getDestinationPhotos,
};