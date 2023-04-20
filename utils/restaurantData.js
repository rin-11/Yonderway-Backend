const axios = require('axios');

const getRestaurantData = async (city) => {
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
        type: 'restaurant',
        key: process.env.GOOGLE_KEY,
      },
    });

    const restaurants = response.data.results.map(async (restaurant) => {
      const photo = restaurant.photos ? restaurant.photos[0].photo_reference : '';
      if (photo) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${process.env.GOOGLE_KEY}`;
        const photoResponse = await axios.get(photoUrl, { responseType: 'arraybuffer' });
        const photoBase64 = Buffer.from(photoResponse.data, 'binary').toString('base64');
        restaurant.photo = `data:image/jpeg;base64,${photoBase64}`;
      } else {
        restaurant.photo = '';
      }
      return {
        name: restaurant.name,
        rating: restaurant.rating,
        description: restaurant.vicinity,
        photo: restaurant.photo,
        location: restaurant.geometry.location,
      };
    });

    return Promise.all(restaurants);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getRestaurantData };
