import pool from './postgres';
import * as Query from './queries';

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

interface OktaUser {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  mobilePhone: string | null;
  secondEmail: string | null;
  login: string;
  email: string;
};

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

export const selectArtist = (daysWithin: number) => {
  return pool.query(Query.getArtistsTest, [daysWithin])
    .then((res: DBResponse): SelectedArtist[] => res.rows)
    .catch((err: object) => console.error(err));
};

export const insertArtist = (artist: NewArtist ) => {
  return pool.query(Query.newArtist, Object.values(artist))
  .then((res: DBResponse): number => res.rowCount)
  .catch((err: object) => console.error(err));
};

export const insertUser = ({ id, status, firstName, lastName, login }: OktaUser) => {
  var username = firstName + ' ' + lastName;
  return pool.query(Query.newUser, [id, username, login, status])
    .then((res: DBResponse): number => res.rowCount)
    .catch((err: object) => console.error(err));
};

export const updateLikes = (id: number) => {
  return pool.query(Query.incrLikes, [id])
    .then((res: DBResponse): number => res.rowCount)
    .catch((err: object) => console.error(err));
};

export const selectLB = () => {
  return pool.query(Query.getLeaderBoard)
    .then((res: DBResponse): SelectedArtist[] => {
      return res.rows.sort((a, b) => {
        return b.likes - a.likes;
      });
    })
    .catch((err: object) => console.error(err));
}

export const selectFavorites = (userId: string) => {
  return pool.query(Query.getFavorites, [userId])
    .then((res: DBResponse): SelectedArtist[] => {
      return res.rows
    })
    .catch((err: object) => console.error(err));
};

export const insertFavorite = async (userId: string, artistId: number) => {
  var result =  await pool.query(Query.checkFavorite, [userId, artistId]);

  if (result.rows.length > 0) return 'Already Favorited';

  return pool.query(Query.addFavorite, [userId, artistId])
    .then((res: DBResponse): string => 'Favorite Added')
    .catch((err: object) => console.error(err));
};

export const deleteFavorite = (userId: string, artistId: number) => {
  return pool.query(Query.deleteFavorite, [userId, artistId])
    .then((res: DBResponse): number => res.rowCount)
    .catch((err: object) => console.error(err));
};