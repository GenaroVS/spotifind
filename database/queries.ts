export const artistTable: string = `CREATE TABLE IF NOT EXISTS artists (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
followers integer CHECK (followers >= 0),
artist_photo VARCHAR(500),
artist_page VARCHAR(500) NOT NULL,
artist_uri VARCHAR(500) NOT NULL,
track VARCHAR(100) NOT NULL,
duration integer,
track_page VARCHAR(500) NOT NULL,
likes integer DEFAULT 0,
date timestamp NOT NULL);`;

export const userTable: string = `CREATE TABLE IF NOT EXISTS users (
id text PRIMARY KEY,
username text NOT NULL,
email text UNIQUE NOT NULL,
status text)`;

export const user_artists: string = `CREATE TABLE IF NOT EXISTS user_artists (
user_id text REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
artist_id integer REFERENCES artists(id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT artist_user_key PRIMARY KEY (artist_id, user_id))`;



export const newArtist: string = `INSERT INTO artists (name, followers, artist_photo, artist_page,
artist_uri, track, duration, track_page, date)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

export const newUser: string = `INSERT INTO users (id, username, email, status)
VALUES ($1, $2, $3, $4)`;

export const getArtistsTest: string = `SELECT * FROM artists
WHERE date + make_interval(mins => $1) >= (SELECT LOCALTIMESTAMP)
ORDER BY id DESC;`;

export const getArtists: string = `SELECT * FROM artists
WHERE extract(DAY FROM age(date)) <= $1 AND extract(MONTH FROM age(date)) = 0;`


export const getLeaderBoard: string = `SELECT * FROM artists
WHERE EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM (SELECT LOCALTIMESTAMP))`;

export const getFavorites: string = `SELECT * FROM artists
LEFT OUTER JOIN user_artists b ON artists.id = b.artist_id WHERE b.user_id = $1`;

export const addFavorite: string = `INSERT INTO user_artists (user_id, artist_id)
VALUES ($1, $2)`;

export const deleteFavorite: string = ` DELETE FROM user_artists
WHERE user_id = $1 AND artist_id = $2`;

export const incrLikes: string = 'UPDATE artists SET likes = likes + 1 WHERE id = $1;';