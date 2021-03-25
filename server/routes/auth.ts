import express from 'express';
const router = express.Router()
const db = require('../../database/postgres');

router.put('/newLike/:id', (req: any, res: any) => {
  db.updateLikes(parseInt(req.params.id))
    .then((rowCount: number) => res.send('Likes Updated for').end())
    .catch((err: any) => console.log(err));
});

module.exports = router