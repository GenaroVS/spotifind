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
      res.send(token).end();
    })
    .catch(err => console.log(err));
});


module.exports = app;