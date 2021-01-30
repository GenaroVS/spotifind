import axios from 'axios';
import qs from 'qs';
const params = qs.stringify({grant_type: 'client_credentials'});

interface Data {
  q: string;
  type: string
  market: string;
  limit: number;
  offset: number;
}

interface ResArtist {
  name: string,
  followers: number,
  artist_photo: string,
  artist_page: string,
}

interface ResTrack {
  track: string;
  duration: number;
  album_photo: string;
  preview: string;
  track_page: string;
  date: Date;
}

interface Artist extends ResArtist, ResTrack {}

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
    .catch((err: any) => console.log(err.response));
};

const getUnpopAlbum = (token: string): Promise<Object> => {
  var data: Data = {
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

const getArtist = (token: string, artistUrl: string): Promise<Object> => {
  return axios.get(artistUrl, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(response => {
      console.log('Artist Status ', response.status);
      return response.data;
    })
    .catch(err => console.log('Artist Error ', err.response.data));
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
  .catch(err => console.log('Track Error ', err.response.data));
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
      }
      return getTrack(token, artist.href)
    })
    .then((track: any): Artist => {
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
  find
}
