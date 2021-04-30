import React, { useEffect , useState} from 'react';
import { Page, Header } from '../styles/BoardStyles.js';
import ArtistItem from './ArtistItem.jsx';

const LeaderBoard = ({ board }) => {
  return (
    <Page>
      <Header>
        <div style={{gridArea: '1/3/1/4', textAlign: 'center'}}>Artist</div>
        <div style={{gridArea: '1/4/1/5', textAlign: 'center'}}>Track</div>
        <div style={{gridArea: '1/5/1/6', textAlign: 'center'}}>Likes</div>
      </Header>
      {board.map((artist, i) => {
        return <ArtistItem
                  key={i}
                  idx={i}
                  artist={artist} />
      })}
    </Page>
  )
};

export default LeaderBoard;