import React, { useContext } from 'react';
import axios from 'axios';
import { Page, InfoCont, Link , Info } from '../styles/ArtistStyles.js';
import { AuthContext } from '../context.js';

export default ({ artist, liked, setLiked, page }) => {
  const FOLLOW_EMBED = 'https://open.spotify.com/follow/1/?uri=';
  const isAuth = useContext(AuthContext);

  function durFormat(duration) {
    var min = Math.floor(duration / 60000);
    var sec = Math.floor((duration - (min * 60000)) / 1000);
    return min + 'min ' + sec + 's';
  }

  function embedTrackFormat(trackUrl) {
    return trackUrl.replace('track/', 'embed/track/')
  }

  function like() {
    if (!liked) {
      axios.put(`/auth/newLike/${artist.id}`)
        .then(response => setLiked(!liked))
        .catch(err => console.log(err));
    }
  }

  if (!artist.artist_photo) {
    return <div>Loading...</div>
  }

  return (
    <Page>
      <InfoCont photoUrl={artist.artist_photo}>
        <Info>
          <Link href={artist.artist_page} target='_blank'>{artist.name}</Link>
          {isAuth && page === 'today' &&
            <span style={{color: 'red', marginLeft: '10px'}} onClick={like}>
              { liked || isAuth.liked === artist.id
                ? <i className="fas fa-heart"></i>
                : <i className="far fa-heart"></i> }
            </span>
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
    </Page>
  )
};