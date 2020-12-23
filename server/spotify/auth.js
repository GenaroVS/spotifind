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
      console.log('Expires: ', response.data.expires_in);
      console.log('Status ', response.status);
      return response.data.access_token;
    })
    .catch(err => console.log(err));
};

const getSpotData = (token, url, data) => {
  axios.get(url, data, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => {
      console.log('Status ', response.status);
      return response.data;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getToken,
  getSpotData
}