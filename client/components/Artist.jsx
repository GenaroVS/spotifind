import React, { useEffect , useState} from 'react';
import styled from 'styled-components';

const Page = styled.div`

`;


export default ({artist, track}) => {

  //Artist: external_urls.spotify, followers, genres, images[0], name
  //Track: album.images[0], external_urls.spotify, duration, preview_url, name
  console.log(artist);
  console.log(track);
  return (
    <section>
      <p>{artist.name}</p>
      <p>{artist.followers.total}</p>
      <img src={artist.images[0].url} alt='Artist Photo' />
      <a href={artist.external_urls.spotify} target='_blank'> Artist Page </a>

      <p>{track.name}</p>
      <p>{track.duration_ms}</p>
      <img src={track.album.images[0].url} alt='Track Album Photo' />
      <a href={track.preview_url} target='_blank'> Preview </a>
      <a href={track.external_urls.spotify} target='_blank'> Track </a>
    </section>
  )
};