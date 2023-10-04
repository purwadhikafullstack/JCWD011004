const axios = require('axios');

async function getLatLongFromAddress(province, city_name) {
  const address = `${city_name} ${province}`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.OPENCAGE_API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Failed to retrieve valid coordinates from the API.');
    }
  } catch (error) {
    console.error('Error while fetching coordinates:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

module.exports = getLatLongFromAddress;