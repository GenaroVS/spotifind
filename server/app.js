const express = require('express');
const app = express();
const allowCrossOrigin = require('./middleware/allowCrossOrigin');
const spot = require('./spotify/auth.js');

app.use(allowCrossOrigin);
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.get('/newArtist', (req, res) => {
  spot.getToken()
    .then(token => {
      return spot.getSpotData(token, 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V')
    })
    .then(response => {
      res.send(response).end();
    })
    .catch(err => console.log(err.config));
});


module.exports = app;