export interface Data {
  q: string;
  type: string
  market: string;
  limit: number;
  offset: number;
}

export interface ResArtist {
  name: string,
  followers: number,
  artist_photo: string,
  artist_page: string,
  artist_uri: string
}

export interface ResTrack {
  track: string;
  duration: number;
  track_page: string;
  date: Date;
}

export interface Artist extends ResArtist, ResTrack {}

export interface NewArtist {
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

export interface SelectedArtist extends NewArtist {
  id: number;
  likes: number;
}

export interface OktaError {
  errorCode: number;
  errorSummary: string;
  errorLink: string;
  errorId: number;
  errorCauses?: object;
}

export interface OktaUser {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  mobilePhone: string | null;
  secondEmail: string | null;
  login: string;
  email: string;
};

export interface DBResponse {
  rows: SelectedArtist[];
  fields: any[];
  command: string;
  rowCount: number;
}