const {client_id, secret_id} = require('./config.js');
const axios = require('axios');
const qs = require('qs');
const params = qs.stringify({grant_type: 'client_credentials'});

const getToken = () => {
  return axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + secret_id).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      console.log('Auth Status ', response.status);
      return response.data.access_token;
    })
    .catch(err => console.log(err));
};

const getSpotData = (token, url, data) => {
  return axios.get(url, {
    params: data,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => {
      console.log('Query Status ', response.status);
      return response.data;
    })
    .catch(err => console.log(err.config));
};

module.exports = {
  getToken,
  getSpotData
}