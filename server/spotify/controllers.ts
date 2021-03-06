import axios from 'axios';
import qs from 'qs';
import { Data, ResArtist, ResTrack, Artist } from '../types';
const params = qs.stringify({grant_type: 'client_credentials'});

const errorHandler = (error: any, title = 'Error') => {
  console.log(title.toUpperCase());
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
}

const getToken = () => {
  return axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID+':'+process.env.SECRET_ID).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response: any): string => {
      console.log('Auth Status ', response.status);
      return response.data.access_token;
    })
    .catch(err => errorHandler(err));
};

const getUnpopAlbum = (token: string): Promise<Object> => {
  var data: Data = {
    q: 'year:2020 tag:hipster',
    type: 'album',
    market: 'US',
    limit: 1,
    offset: Math.floor(Math.random() * 1000)
  }

  return axios.get('https://api.spotify.com/v1/search', {
    params: data,
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Album Status ', response.status);
      return response.data.albums.items[0];
    })
    .catch(err => errorHandler(err, 'Album Error'));
};

const getArtist = (token: string, artistUrl: string): Promise<Object> => {
  return axios.get(artistUrl, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Artist Status ', response.status);
      return response.data;
    })
    .catch(err => errorHandler(err, 'Artist Error'));
};

const getTrack = (token: string, artist: Object): Promise<Object> => {
  return axios.get(artist + '/top-tracks', {
    params: {market: 'US'},
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(response => {
    console.log('Track Status ', response.status);
    return response.data.tracks[0];
  })
  .catch(err => errorHandler(err, 'Track Error'));
};

const find = () => {
  let token: string, resArtist: ResArtist, resTrack: ResTrack;
  return getToken()
    .then((response: string) => {
      token = response;
      return getUnpopAlbum(token);
    })
    .then((album: any) => getArtist(token, album.artists[0].href))
    .then((artist: any) => {
      resArtist = {
        name: artist.name,
        followers: artist.followers.total,
        artist_photo: artist.images[0].url,
        artist_page: artist.external_urls.spotify,
        artist_uri: artist.uri
      }
      return getTrack(token, artist.href)
    })
    .then((track: any): Artist => {
      resTrack = {
        track: track.name,
        duration: track.duration_ms,
        track_page: track.external_urls.spotify,
        date: new Date()
      }
      return {...resArtist, ...resTrack};
    })
    .catch(err => console.log(err.config));
}

module.exports = {
  find
}
