const express = require('express');
const app = express();
const allowCrossOrigin = require('./middleware/allowCrossOrigin');
const spot = require('./spotify/controllers.js');
const db = require('../database/postgres.js');

app.use(allowCrossOrigin);
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.get('/newArtist', (req, res) => {
  db.selectArtist(1)
    .then(artists => {
      if (artists.length === 0) {
        return spot.find();
      } else {
        res.json(artists).end();
      }
    })
    .then(artist => {
      db.insertArtist(artist)
        .then(response => {
          res.json(artist).end();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

app.get('/prevArtists', (req, res) => {

});

app.get('/allArtists', (req, res) => {

});

app.put('/newLike', (req, res) => {

});

module.exports = app;