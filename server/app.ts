import express = require('express');
const app = express();
import path = require('path');
const allowCrossOrigin = require('./middleware/allowCrossOrigin');
const Spotify = require('./spotify/controllers');
const db = require('../database/postgres');

app.use(allowCrossOrigin);
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../public')));
}

interface NewArtist {
  name: string;
  followers: number
  artist_photo: string;
  artist_page: string;
  track: string;
  duration: number;
  album_photo: string;
  preview: string;
  track_page: string;
  date: Date;
}

interface SelectedArtist extends NewArtist {
  id: number;
  likes: number;
}

app.get('/api/newArtist', (req: any, res: any) => {
  db.selectArtist(1)
    .then((artists: SelectedArtist[]) => {
      if (artists.length === 0) {
        Spotify.find()
          .then((artist: NewArtist) => db.insertArtist(artist))
          .then(() => db.selectArtist(1))
          .then((artists: SelectedArtist[]) => res.json(artists[0]).end())
          .catch((err: any) => console.log(err));
      } else {
        res.json(artists[0]).end();
      }
    })
    .catch((err: any) => console.log(err));
});

app.get('/api/prevArtists', (req: any, res: any) => {
  db.selectArtist(3)
    .then((artists: SelectedArtist[]) => res.json(artists).end())
    .catch((err: any) => console.log(err));
});

app.get('/api/leaderboard', (req: any, res: any) => {
  db.selectLB()
    .then((artists: SelectedArtist[]) => res.json(artists).end())
    .catch((err: any) => console.log(err));
});

app.put('/api/newLike/:id', (req: any, res: any) => {
  db.updateLikes(parseInt(req.params.id))
    .then((rowCount: number) => res.send('Likes Updated for').end())
    .catch((err: any) => console.log(err));
});

export = app;