import express from 'express';
import { likes } from '../middleware/extendUser';
const router = express.Router()
const db = require('../../database/postgres');

router.put('/newLike/:id', (req: any, res: any) => {
  likes[req.userContext.userinfo.sub] = Number(req.params.id);

  db.updateLikes(parseInt(req.params.id))
    .then((rowCount: number) => res.send('Likes Updated for').end())
    .catch((err: any) => console.log(err));
});

module.exports = router