import express from 'express';
const router = express.Router()
const Spotify = require('../spotify/controllers');
const db = require('../../database/postgres');

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

router.get('/newArtist', (req: any, res: any) => {
  db.selectArtist(2)
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

router.get('/prevArtists', (req: any, res: any) => {
  db.selectArtist(8)
    .then((artists: SelectedArtist[]) => res.json(artists).end())
    .catch((err: any) => console.log(err));
});

router.get('/leaderboard', (req: any, res: any) => {
  db.selectLB()
    .then((artists: SelectedArtist[]) => res.json(artists).end())
    .catch((err: any) => console.log(err));
});

router.put('/newLike/:id', (req: any, res: any) => {
  db.updateLikes(parseInt(req.params.id))
    .then((rowCount: number) => res.send('Likes Updated for').end())
    .catch((err: any) => console.log(err));
});

module.exports = router