const axios = require('axios');
const qs = require('qs');
const params = qs.stringify({grant_type: 'client_credentials'});

const getToken = () => {
  return axios.post(process.env.BASE_URL + '/api/token', params, {
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.SECRET_ID).toString('base64')),
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

const find = () => {
  let token, resArtist, resTrack;
  return getToken()
    .then(response => {
      token = response;
      return getUnpopAlbum(token);
    })
    .then(album => getArtist(token, album.artists[0].href))
    .then(artist => {
      resArtist = {
        name: artist.name,
        followers: artist.followers.total,
        artist_photo: artist.images[0].url,
        artist_page: artist.external_urls.spotify,
      }
      return getTrack(token, artist.href)
    })
    .then(track => {
      resTrack = {
        track: track.name,
        duration: track.duration_ms,
        album_photo: track.album.images[0].url,
        preview: track.preview_url,
        track_page: track.external_urls.spotify,
        date: new Date()
      }
      return {...resArtist, ...resTrack};
    })
    .catch(err => console.log(err.config));
}

module.exports = {
  find,
}