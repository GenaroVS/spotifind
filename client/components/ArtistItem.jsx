import React from 'react';
import { Rank, Image, Column, Link } from '../styles/ArtistItemStyles.js';


const ArtistItem = ({ artist, idx }) => {
  return (
    <Rank>
      <h3>{idx + 1}</h3>
      <Image src={artist.artist_photo} alt='Artist Photo' />
      <Link href={artist.artist_page} target='_blank'>{artist.name}</Link>
      <Column>{artist.track}</Column>
      <Column>
        {artist.likes}
        <i style={{marginLeft: '5px', color: 'red'}} className="fas fa-heart"></i>
      </Column>
    </Rank>
  )
};

export default ArtistItem;