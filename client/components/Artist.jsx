import React, { useEffect , useState} from 'react';
import axios from 'axios';
import { Page, InfoCont, Link , Info, Image} from '../styles/ArtistStyles.js';


export default ({ artist, page }) => {

  const [liked, setLiked] = useState(false);

  function durFormat(duration) {
    var min = Math.floor(duration / 60000);
    var sec = Math.floor((duration - (min * 60000)) / 1000);
    return min + 'min ' + sec + 's';
  }

  function like() {
    if (!liked) {
      axios.put(`/api/newLike/${artist.id}`)
        .then(response => setLiked(!liked))
        .catch(err => console.log(err));
    }
  }

  return (
    <Page>
      <InfoCont>
        <Image src={artist.artist_photo} alt='Artist Photo' />
        <Info>
          <Link href={artist.artist_page} target='_blank'>Artist: {artist.name}</Link>
          <div>{artist.followers} Followers</div>
        </Info>
      </InfoCont>
      <InfoCont>
        <Image src={artist.album_photo} alt='Track Album Photo' />
        <Info>
          <Link href={artist.track_page} target='_blank'>Track: {artist.track}</Link>
          {page !== 'previous' &&
            <span style={{color: 'red'}} onClick={like}>
              { liked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i> }
            </span>
          }
          <div>{durFormat(artist.duration)}</div>
          <Link href={artist.preview} target='_blank'> Preview </Link>
        </Info>
      </InfoCont>
    </Page>
  )
};