import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../styles/BoardStyles.js';
import ArtistItem from './ArtistItem.jsx';
import ArtistsNav from './ArtistsNav.jsx';

const filterHandler = (artists = []) => {
  let artists = artists;
  return function(query) {
    let { search, category } = query;
    if (!search && !category) return artists;
  }
}

const LeaderBoard = ({ board }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const filter = filterHandler(board);
  let artists = filter({ search, category })
  console.log('Search: ', search);
  console.log('Category: ', category);


  return (
    <Page>
      <ArtistsNav setSearch={setSearch} setCategory={setCategory}/>
      {artists.map((artist, i) => {
        return <ArtistItem
                  key={uuidv4()}
                  idx={i}
                  artist={artist} />
      })}
    </Page>
  )
};

export default LeaderBoard;