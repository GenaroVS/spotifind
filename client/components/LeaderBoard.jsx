import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../styles/BoardStyles.js';
import ArtistItem from './ArtistItem.jsx';
import ArtistsNav from './ArtistsNav.jsx';

const filterHandler = (board = []) => {
  let artists = board;
  return function(query) {
    let { search, category } = query;
    if (!search && !category) return artists;

    if (search) {
      artists = artists.filter(({ name, track }) => {
        console.log(track);
        console.log(search);
        return name.indexOf(search) >= 0 || track.indexOf(search) >= 0;
      });
    }

    if (category === 'Artist') {
      artists = artists.sort((a, b) => {
        if (a.name < b.name) return -1;
        else return 1;
      });
    } else if (category === 'Track') {
      artists = artists.sort((a, b) => {
        if (a.track < b.track) return -1;
        else return 1;
      });
    } else if (category === 'Likes') {
      artists = artists.sort((a, b) => b.likes - a.likes);
    }
    return artists;
  }
}

const LeaderBoard = ({ board }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const filter = filterHandler(board);
  const artists = filter({ search, category })

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