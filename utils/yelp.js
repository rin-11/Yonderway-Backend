const axios = require('axios');

const yelp = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept-Language': 'en_US',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Expose-Headers': 'Authorization',
    'X-Yelp-Client-ID': process.env.YELP_CLIENT_ID,
  },
});

module.exports = yelp;
