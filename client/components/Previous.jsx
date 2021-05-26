import React from 'react';
import Artist from './Artist.jsx';

export default ({ previous, page }) => {


  return (
    <>
      {previous.map(artist => {
        return <Artist artist={artist} page={page}/>
      })}
    </>
  )
};