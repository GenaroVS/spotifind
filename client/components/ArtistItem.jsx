import React from 'react';
import { Rank, Image, Column } from '../styles/ArtistItemStyles.js';


const ArtistItem = ({ artist, idx }) => {
  return (
    <Rank>
      <h3>{idx + 1}</h3>
      <Image src={artist.artist_photo} alt='Artist Photo' />
      <Column>{artist.name}</Column>
      <Column>{artist.track}</Column>
      <Column>
        {artist.likes}
        <i style={{marginLeft: '5px', color: 'red'}} className="fas fa-heart"></i>
      </Column>
    </Rank>
  )
};

export default ArtistItem;