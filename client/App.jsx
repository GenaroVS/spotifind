import React, { useEffect , useState } from 'react';
import axios from 'axios';

import Artist from './components/Artist.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import Previous from './components/Previous.jsx';
import Register from './components/Register.jsx';
import { Logo, Container, NavBar, NavBtn, MainBtn, UserPanel, UserBtn } from './styles/AppStyles.js';
import { AuthContext } from './context.js';

export default () => {
  const [artist, setArtist] = useState({});
  const [previous, setPrevious] = useState([]);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [page, setPage] = useState('');
  const [liked, setLiked] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      await axios.get('/user')
        .then(user => user ? setAuth(user.data) : setAuth(false))
        .catch(err => console.log(err));

      await axios.get('/api/newArtist')
        .then(artist => {
          setArtist(artist.data)
        })
        .catch(err => console.log(err));
      await axios.get('/api/prevArtists')
        .then(artists => {
          console.log(artists.data);
          setPrevious(artists.data.slice(1))
        })
        .catch(err => console.log(err));
      await axios.get('/api/leaderboard')
        .then(artists => setLeaderBoard(artists.data))
        .catch(err => console.log(err));
    })()
  }, [])

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then(artists => setLeaderBoard(artists.data))
      .catch(err => console.log(err));
  }, [liked])

  return (
    <AuthContext.Provider value={isAuth}>
      <Container />
        <NavBar>
          <Logo> Spotifind </Logo>
          <NavBtn onClick={e => setPage(e.target.id)} id='previous'> Previous Days </NavBtn>
          <MainBtn onClick={e => setPage(e.target.id)} id='today'> Today's Song </MainBtn>
          <NavBtn onClick={e => setPage(e.target.id)} id='leaderboard'> Leaderboard </NavBtn>
          <UserPanel>
            {!isAuth ? (
              <form action='/login'>
                  <UserBtn type='submit'> Log In </UserBtn>
                </form>
              ) : (
                <form method='post' action='/logout'>
                  <UserBtn type='submit'> Log Out </UserBtn>
                </form>
              )
            }
            <UserBtn onClick={e => setPage(e.target.id)} id='register'> Sign Up </UserBtn>
          </UserPanel>
        </NavBar>
        {page === 'previous' && <Previous page={page} previous={previous}/>}
        {page === 'today' &&
          <Artist
            artist={artist}
            setLiked={setLiked}
            liked={liked}
            page={page}/>}
        {page === 'leaderboard' && <Leaderboard board={leaderboard}/>}
        {page === 'register' && <Register />}
    </AuthContext.Provider>
  )
}