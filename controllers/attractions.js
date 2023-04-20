const attractionData = require('../utils/attractionsData');
const Attraction = require('../models/Attraction');

exports.getLocalAttractions = async (city, attractionType) => {
  const attraction = await Attraction.findOne({ city, type: attractionType });

  if (attraction) {
    return attraction.attractions;
  } else {
    const attractions = await attractionData.getLocalAttractions(city, attractionType);
    await saveAttractions(city, attractionType, attractions);
    return attractions;
  }
};

const saveAttractions = async (city, attractionType, attractions) => {
  const newAttraction = new Attraction({
    city,
    type: attractionType,
    attractions,
  });
  await newAttraction.save();
};
