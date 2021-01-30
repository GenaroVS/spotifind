const Query = require('./queries');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
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

pool.query(Query.artistTable)
  .then(() => {
    console.log('Table Added');
  })
  .catch((err: any) => console.log(err));

const selectArtist = (daysWithin: number) => {
  return pool.query(Query.getArtistsTest, [daysWithin])
    .then((res: DBResponse): SelectedArtist[] => res.rows)
    .catch((err: any) => console.log(err));
};

const insertArtist = (artist: NewArtist ) => {
  return pool.query(Query.newArtist, Object.values(artist))
    .then((res: DBResponse): DBResponse => res)
    .catch((err: any) => console.log(err));
};

const updateLikes = (id: number) => {
  return pool.query(Query.incrLikes, [id])
    .then((res: DBResponse): number => res.rowCount)
    .catch((err: any) => console.log(err));
};

const selectLB = () => {
  return pool.query(Query.getLeaderBoard)
    .then((res: DBResponse): SelectedArtist[] => {
      return res.rows.sort((a, b) => {
        return b.likes - a.likes;
      });
    })
    .catch((err: any) => console.log(err));
}

module.exports = {
  selectArtist,
  insertArtist,
  updateLikes,
  selectLB
}
