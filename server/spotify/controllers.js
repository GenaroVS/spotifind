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

const getUnpopAlbum = (token) => {
  var data = {
    q: 'year:2020 tag:hipster',
    type: 'album',
    market: 'US',
    limit: 1,
    offset: Math.floor(Math.random() * 2000)
  }
  return axios.get('https://api.spotify.com/v1/search', {
    params: data,
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Album Status ', response.status);
      return response.data.albums.items[0];
    })
    .catch(err => console.log('Album Error ', err.response.data));
};

const getArtist = (token, artistUrl) => {
  return axios.get(artistUrl, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Artist Status ', response.status);
      return response.data;
    })
    .catch(err => console.log('Artist Error ', err.response.data));
};

const getTrack = (token, artist) => {
  return axios.get(artist + '/top-tracks', {
    params: {market: 'US'},
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(response => {
    console.log('Track Status ', response.status);
    return response.data.tracks[0];
  })
  .catch(err => console.log('Track Error ', err.response.data));
};

module.exports = {
  getToken,
  getUnpopAlbum,
  getArtist,
  getTrack
}