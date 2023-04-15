const axios = require('axios');

const getLocalAttractions = async (city, attractionType) => {
  try {
    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: city,
        key: process.env.GOOGLE_KEY,
      },
    });

    const location = geocodeResponse.data.results[0].geometry.location;

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${location.lat},${location.lng}`,
        radius: 5000,
        type: attractionType,
        key: process.env.GOOGLE_KEY,
      },
    });

    const attractions = response.data.results.map((attraction) => {
      return {
        name: attraction.name,
        rating: attraction.rating,
        description: attraction.vicinity,
        photo: attraction.photos ? attraction.photos[0].photo_reference : '',
      };
    });

    return attractions;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getLocalAttractions };
