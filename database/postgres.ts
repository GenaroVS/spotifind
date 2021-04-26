import * as Query from './queries';
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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

interface DBResponse {
  rows: SelectedArtist[];
  fields: any[];
  command: string;
  rowCount: number;
}

(async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(Query.artistTable);
    console.log('Artist table added');
    await client.query(Query.userTable);
    console.log('User table added');
    await client.query(Query.user_artists);
    console.log('Join table added');
    await client.query('COMMIT');
    console.log('All tables added');
  } catch(err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
  }
})().catch(err => console.error(err.stack))

export = pool;