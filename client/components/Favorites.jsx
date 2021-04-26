import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context.js';
import ArtistItem from './ArtistItem.jsx';
import { List } from '../styles/FavoritesStyles.js';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/auth/favorites/${user.sub}`)
      .then(favData => {
        setFavorites(favData.data)
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <List>
      {
        favorites.length && favorites.map((artist, i) => {
          return <ArtistItem key={i} idx={i} artist={artist} />
        })
      }
    </List>
  )
};

export default Favorites;