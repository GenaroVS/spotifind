import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/context.js';
import ArtistItem from './ArtistItem.jsx';
import { List, Favorite, FavCont } from '../styles/FavoritesStyles.js';


function formatTitle(name) {
  var lastChar = name[name.length - 1];
  return lastChar === 's' || lastChar === 'S' ?
    `${name}' Best of the Worst` :
    `${name}'s Best of the Worst`;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const user = useContext(AuthContext);
  console.log(user);

  function deleteFav(e) {
    let artistId = e.currentTarget.id;
    axios.delete('/auth/favorites', {
      data: {
        userId: user.sub,
        artistId: artistId
      }
    })
      .then(res => {
        var filtered = favorites.filter(artist => {
          return artist.id !== Number(artistId)
        });
        setFavorites(filtered);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    axios.get(`/auth/favorites/${user.sub}`)
      .then(favData => {
        setFavorites(favData.data)
      })
      .catch(err => console.error(err));
  }, [])


  return (
    <FavCont>
      <h1>{formatTitle(user.given_name)}</h1>
      <List>
        { favorites.length > 0 ?
          favorites.map((artist, i) => {
            return (
              <Favorite key={artist.id} id={artist.id}>
                <ArtistItem key={artist.id} idx={i} artist={artist} />
                <i
                  id={artist.id}
                  onClick={deleteFav}
                  className="fas fa-times"></i>
              </Favorite>
            )
          }) :
          <h3>No Favorites</h3>
        }

      </List>
    </FavCont>
  )
};

export default Favorites;