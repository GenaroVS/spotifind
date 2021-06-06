import React from 'react';
import Artist from './Artist.jsx';
import { v4 as uuidv4 } from 'uuid';

export default ({ previous, page }) => {


  return (
    <>
      {previous.map(artist => {
        return <Artist key={uuuidv4()} artist={artist} page={page}/>
      })}
    </>
  )
};