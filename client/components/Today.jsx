import React, { useState, useContext } from 'react';
import axios from 'axios';
import Chat from './Chat.jsx';
import ArtistBanner from './ArtistBanner.jsx';
import { Page } from '../styles/TodayStyles.js';
import { AuthContext } from '../utils/context.js';

export default ({ artist, liked, setLiked }) => {
  const user = useContext(AuthContext);
  const [hasFav, setFavoriteRes] = useState('');


  function like() {
    var popup = document.getElementById('popup-liked');
    popup.classList.toggle('open');

    setTimeout(() => {
      popup.classList.toggle('open');
    }, 2000);

    if (!liked) {
      axios.put(`/auth/newLike/${artist.id}`)
        .then(res => setLiked(!liked))
        .catch(err => console.error(err));
    }
  }

  function favorite() {
    var popup = document.getElementById('popup-fav');
    popup.classList.toggle('open');
    setTimeout(() => {
      popup.classList.toggle('open');
    }, 2000);


    axios.post('/auth/favorites', {
      userId: user.sub,
      artistId: artist.id
    })
      .then(res => setFavoriteRes(res.data))
      .catch(err => console.error(err));
  }

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
        like={like}
        favorite={favorite}
        artist={artist}
        liked={liked}/>
      <Chat />
    </Page>
  )
};