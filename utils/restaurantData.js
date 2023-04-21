const yelp = require("./yelp");

const getLocalRestaurants = async (city) => {
  try {
    const searchRequest = {
      term: "restaurants",
      location: city,
      limit: 4,
      sort_by: "rating",
    };
    const response = await yelp.get("/businesses/search", { params: searchRequest });
    const restaurants = response.data.businesses.map((business) => ({
      name: business.name,
      rating: business.rating,
      description: business.location.address1,
      photo: business.image_url,
    }));
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getLocalRestaurants };
