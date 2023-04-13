const axios = require('axios');

const getRandomDestinations = async () => {
  try {
    const countries = ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'France', 'Germany', 'Spain', 'Italy', 'United Kingdom', 'Russia', 'India', 'China', 'Japan', 'Australia'];
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];

    // Define different types of places to search for.
    const placeTypes = ['park', 'museum', 'monument', 'beach'];

    const placePromises = placeTypes.map(async (placeType) => {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeType)}+in+${encodeURIComponent(randomCountry)}&key=${process.env.GOOGLE_KEY}`);
      const predictions = response.data.results;

      if (predictions.length === 0) {
        return null;
      }

      const randomPlaceIndex = Math.floor(Math.random() * predictions.length);
      return predictions[randomPlaceIndex].place_id;
    });

    const placeIds = await Promise.all(placePromises);
    return placeIds.filter(placeId => placeId !== null);
  } catch (error) {
    console.error(error);
  }
};


const getDestinationPhotos = async (destinations) => {
  try {
    const photoPromises = destinations.map(async (destinationId) => {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${destinationId}&fields=photos&key=${process.env.GOOGLE_KEY}`);
      console.log(`Response for ${destinationId}:`, response.data);
      const candidate = response.data.result;
      if (!candidate || !candidate.photos || candidate.photos.length === 0) {
        console.log(`No photos for ${destinationId}`);
        return null;
      }
      
      // Choose a random photo from the list of photos.
      const randomPhotoIndex = Math.floor(Math.random() * candidate.photos.length);
      const photoReference = candidate.photos[randomPhotoIndex].photo_reference;

      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_KEY}`;
    });
    const photos = await Promise.all(photoPromises);
    console.log('Photos:', photos);
    return photos.filter(photo => photo !== null);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getRandomDestinations,
  getDestinationPhotos,
};