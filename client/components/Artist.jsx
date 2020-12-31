import React, { useEffect , useState} from 'react';
import styled from 'styled-components';

const Page = styled.div`

`;


export default ({artist}) => {

  //Artist: external_urls.spotify, followers, genres, images[0], name
  //Track: album.images[0], external_urls.spotify, duration, preview_url, name
  console.log(artist);
  return (
    <section>
      <p>{artist.name}</p>
      <p>{artist.followers}</p>
      <img src={artist.artist_photo} alt='Artist Photo' />
      <a href={artist.artist_page} target='_blank'> Artist Page </a>

      <p>{artist.track}</p>
      <p>{artist.duration}</p>
      <img src={artist.album_photo} alt='Track Album Photo' />
      <a href={artist.preview} target='_blank'> Preview </a>
      <a href={artist.track_page} target='_blank'> Track </a>
      <p>{artist.likes}</p>
    </section>
  )
};