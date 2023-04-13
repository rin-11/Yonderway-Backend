const { getRandomDestinations, getDestinationPhotos } = require('../utils/destinationData');

const getDestinations = async (req, res) => {
  try {
    const destinations = await getRandomDestinations();
    const photos = await getDestinationPhotos(destinations);
    res.json({ destinations, photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getRandomPhotos = async (req, res) => {
  try {
    const destinations = await getRandomDestinations();
    const photos = await getDestinationPhotos(destinations);
    res.json({ photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getDestinations,
  getRandomPhotos,
};
