import React, { useState, useContext } from 'react';
import axios from 'axios';
import Chat from './Chat.jsx';
import { Page, InfoCont, Link , Info } from '../styles/ArtistStyles.js';
import Popup from './Popup.jsx';
import { AuthContext } from '../utils/context.js';

function durFormat(duration) {
  var min = Math.floor(duration / 60000);
  var sec = Math.floor((duration - (min * 60000)) / 1000);
  return min + 'min ' + sec + 's';
}

function embedTrackFormat(trackUrl) {
  return trackUrl.replace('track/', 'embed/track/')
}

export default ({ artist, liked, setLiked }) => {
  const FOLLOW_EMBED = 'https://open.spotify.com/follow/1/?uri=';
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
        .catch(err => console.log(err));
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
      .catch(err => console.err(err));
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
      <InfoCont photoUrl={artist.artist_photo}>
        <Info>
          <Link href={artist.artist_page} target='_blank'>{artist.name}</Link>
          {user &&
            <>
              <span onClick={like}>
                { liked || user.liked === artist.id
                  ? <i className="fas fa-heart"></i>
                  : <i className="far fa-heart"></i> }
                <Popup id='liked' content='Liked'/>
              </span>
              <span onClick={favorite} >
                <Popup id='fav' content={hasFav}/>
                <i className="fas fa-star"></i>
              </span>
            </>
          }
          <div>{artist.followers} Followers</div>
          <iframe
            src={`${FOLLOW_EMBED}${artist.artist_uri}&show-count=0`}
            width='200'
            height='28'
            scrolling='no'
            frameBorder='0'
            allowtransparency='true'>
          </iframe>
        </Info>
        <iframe
          src={embedTrackFormat(artist.track_page)}
          width='400'
          height='80'
          frameBorder='0'
          allowtransparency='true'
          allow='encrypted-media'>
        </iframe>
      </InfoCont>
      <Chat />
    </Page>
  )
};