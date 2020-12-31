const Query = require('./queries.js');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:Ximena.1@localhost:5432/spotifind'
});

pool.query(Query.artistTable)
  .then(res => {
    console.log('Table Added');
  })
  .catch(err => console.log(err));

const selectArtist = (daysWithin) => {
  return pool.query(Query.getArtists, [daysWithin])
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const insertArtist = (artist) => {
  return pool.query(Query.newArtist, Object.values(artist))
    .then(res => res)
    .catch(err => console.log(err));
};

const updateLikes = (pageUrl) => {
  return pool.query(Query.incrLikes, [pageUrl])
    .then(res => res)
    .catch(err => console.log(err));
};

module.exports = {
  selectArtist,
  insertArtist,
  updateLikes,
}
