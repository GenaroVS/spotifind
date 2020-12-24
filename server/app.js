const express = require('express');
const app = express();
const allowCrossOrigin = require('./middleware/allowCrossOrigin');
const spot = require('./spotify/controllers.js');

app.use(allowCrossOrigin);
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.get('/newArtist', (req, res) => {
  let token, resArtist, resTrack;
  spot.getToken()
    .then(response => {
      token = response;
      return spot.getUnpopAlbum(token);
    })
    .then(album => spot.getArtist(token, album.artists[0].href))
    .then(artist => {
      resArtist = artist;
      return spot.getTrack(token, artist.href)
    })
    .then(track => {
      resTrack = track;
      res.json({resArtist, resTrack}).end();
    })
    .catch(err => console.log(err.config));
});


module.exports = app;