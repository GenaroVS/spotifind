import React, { useEffect , useState} from 'react';
import Artist from './Artist.jsx';

export default ({ previous, page }) => {

  console.log(previous);
  return (
    <>
      {previous.map(artist => {
        return <Artist artist={artist} page={page}/>
      })}
    </>
  )
};