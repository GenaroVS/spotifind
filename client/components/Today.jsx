import React from 'react';
import Chat from './Chat.jsx';
import ArtistBanner from './ArtistBanner.jsx';
import { Page } from '../styles/TodayStyles.js';

export default ({ artist, liked, setLiked }) => {

  if (!artist.artist_photo) {
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    )
  }

  return (
    <Page>
      <ArtistBanner
        setLiked={setLiked}
        artist={artist}
        liked={liked}/>
      <Chat />
    </Page>
  )
};