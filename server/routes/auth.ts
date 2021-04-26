import express from 'express';
import { likes } from '../middleware/extendUser';
import * as db from '../../database/models';
const router = express.Router()

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

router.put('/newLike/:id', (req: any, res: any) => {
  likes[req.userContext.userinfo.sub] = Number(req.params.id);

  db.updateLikes(parseInt(req.params.id))
    .then((rowCount: number) => res.send('Likes Updated for').end())
    .catch((err: any) => console.log(err));
});


router.get('/favorites/:user', (req, res) => {
  db.selectFavorites(req.params.user)
    .then((favs: SelectedArtist[]) => res.json(favs).end())
    .catch((err: object) => console.error(err));
});

router.post('/favorites', (req, res) => {
  console.log(req.body);
  var { userId, artistId } = req.body;
  db.insertFavorite(userId, artistId)
    .then((rowCount: number) => res.send('Added Favorite').end())
    .catch((err: object) => console.error(err));
});


router.delete('/favorites', (req, res) => {
  var { userId, artistId } = req.body;
  db.deleteFavorite(userId, artistId)
    .then((rowCount: number) => res.send('Deleted Favorite').end())
    .catch((err: object) => console.error(err));
});

module.exports = router