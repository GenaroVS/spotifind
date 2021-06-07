import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../styles/BoardStyles.js';
import useArtistsFilter from '../utils/useArtistsFilter.js';
import ArtistItem from './ArtistItem.jsx';
import ArtistsNav from './ArtistsNav.jsx';

const LeaderBoard = ({ board }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isDecr, setIsDecr] = useState(true);
  const artists = useArtistsFilter(board, { search, category, isDecr })

  if (board.length === 0) {
    return <h3> No Artists </h3>
  }

  return (
    <Page>
      <h1>Monthly Leaderboard</h1>
      <ArtistsNav
        setSearch={setSearch}
        currentCategory={category}
        setCategory={setCategory}
        isDecr={isDecr}
        setIsDecr={setIsDecr} />
      {
        artists.map((artist, i) => {
          return <ArtistItem key={uuidv4()} idx={i} artist={artist} />
        })
      }
    </Page>
  )
};

export default LeaderBoard;