import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ArtistItem from './ArtistItem.jsx';
import ArtistsNav from './ArtistsNav.jsx';
import { AuthContext } from '../utils/context.js';
import useArtistsFilter from '../utils/useArtistsFilter.js';
import { List, Favorite, FavCont } from '../styles/FavoritesStyles.js';


const formatTitle = (name = 'John Smith') => {
  var lastChar = name[name.length - 1];
  return lastChar === 's' || lastChar === 'S' ?
    `${name}' Best of the Worst` :
    `${name}'s Best of the Worst`;
};

const Favorites = () => {
  const [initFavs, setInitFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isDecr, setIsDecr] = useState(true);
  const favorites = useArtistsFilter(initFavs, { search, category, isDecr })
  const user = useContext(AuthContext);
  console.log('User: ', user);

  const deleteFav = (e) => {
    let artistId = e.currentTarget.id;
    axios.delete('/auth/favorites', {
      data: {
        userId: user.sub,
        artistId: artistId
      }
    })
      .then(res => {
        let filtered = favorites.filter(artist => {
          return artist.id !== Number(artistId)
        });
        console.log(filtered);
        setInitFavorites(filtered);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get(`/auth/favorites/${user.sub}`)
      .then(favData => {
        setInitFavorites(favData.data)
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <FavCont>
      <h1>{formatTitle(user.given_name)}</h1>
      <ArtistsNav
        setSearch={setSearch}
        setCategory={setCategory}
        isDecr={isDecr}
        setIsDecr={setIsDecr} />
      <List>
        { favorites.length > 0 ?
          favorites.map((artist, i) => {
            return (
              <Favorite key={uuidv4()} id={artist.id}>
                <ArtistItem key={uuidv4()} idx={i} artist={artist} />
                <i
                  id={artist.id}
                  onClick={deleteFav}
                  className="fas fa-times"></i>
              </Favorite>
            )
          }) : <h3>No Favorites</h3>
        }
      </List>
    </FavCont>
  )
};

export default Favorites;