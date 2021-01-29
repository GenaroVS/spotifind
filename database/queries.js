const artistTable = `CREATE TABLE IF NOT EXISTS artists (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
followers integer CHECK (followers >= 0),
artist_photo VARCHAR(500),
artist_page VARCHAR(500) NOT NULL,
track VARCHAR(100) NOT NULL,
duration integer,
album_photo VARCHAR(500),
preview VARCHAR(500) NOT NULL,
track_page VARCHAR(500) NOT NULL,
likes integer DEFAULT 0,
date timestamp NOT NULL);`;

const newArtist = `INSERT INTO artists (name, followers, artist_photo, artist_page,
track, duration, album_photo, preview, track_page, date)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

const getArtistsTest = `SELECT * FROM artists
WHERE date + make_interval(mins => $1) >= (SELECT LOCALTIMESTAMP)
ORDER BY id DESC;`;

const getArtists = `SELECT * FROM artists
WHERE extract(DAY FROM age(date)) <= $1 AND extract(MONTH FROM age(date)) = 0;`

const incrLikes = 'UPDATE artists SET likes = likes + 1 WHERE id = $1;';

const getLeaderBoard = `SELECT * FROM artists
WHERE EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM (SELECT LOCALTIMESTAMP))`;

module.exports = {
  artistTable,
  newArtist,
  getArtistsTest,
  getArtists,
  incrLikes,
  getLeaderBoard,
}