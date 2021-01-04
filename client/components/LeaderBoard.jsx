import React, { useEffect , useState} from 'react';
import styled from 'styled-components';
import { Page, Rank, Image, Column, Header } from '../styles/BoardStyles.js';

export default ({ board }) => {


  return (
    <Page>
      <Header>
        <div style={{gridArea: '1/3/1/4', textAlign: 'center'}}>Artist</div>
        <div style={{gridArea: '1/4/1/5', textAlign: 'center'}}>Track</div>
        <div style={{gridArea: '1/5/1/6', textAlign: 'center'}}>Likes</div>
      </Header>
      {board.map((artist, i) => {
        return (
          <Rank>
            <h3>{i + 1}</h3>
            <Image src={artist.artist_photo} alt='Artist Photo' />
            <Column>{artist.name}</Column>
            <Column>{artist.track}</Column>
            <Column>
              {artist.likes}
              <i style={{marginLeft: '5px', color: 'red'}} className="fas fa-heart"></i>
            </Column>
          </Rank>
        )
      })}
    </Page>
  )
};