import React, { useEffect , useState, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

const Artist = lazy(() => import('./components/Artist.jsx'));
const Leaderboard = lazy(() => import('./components/LeaderBoard.jsx'));
const Previous = lazy(() => import('./components/Previous.jsx'));
const Register = lazy(() => import('./components/Register.jsx'));
const Favorites = lazy(() => import('./components/Favorites.jsx'));
import SideBar from './components/SideBar.jsx';
import { Logo, Container, NavBar, NavBtn, MainBtn } from './styles/AppStyles.js';
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
      <Router>
        <Container/>
          <NavBar>
            <Logo> Spotifind </Logo>
            <Link to='/previous'>
              <NavBtn onClick={e => setPage(e.target.id)} id='previous'> Previous Days </NavBtn>
            </Link>
            <Link to='/today'>
              <MainBtn onClick={e => setPage(e.target.id)} id='today'> Today's Song </MainBtn>
            </Link>
            <Link to='/leaderboard'>
              <NavBtn onClick={e => setPage(e.target.id)} id='leaderboard'> Leaderboard </NavBtn>
            </Link>
          </NavBar>
          <SideBar setPage={setPage} />
          <Suspense fallback={<h1 style={{textAlign: 'center'}}>Loading...</h1>}>
            <Switch>
              <Route path='/previous'>
                <Previous page={page} previous={previous}/>
              </Route>
              <Route path='/today'>
                <Artist
                  artist={artist}
                  setLiked={setLiked}
                  liked={liked}
                  page={page}/>
              </Route>
              <Route path='/leaderboard'>
                <Leaderboard board={leaderboard} />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/favorites'>
                <Favorites />
              </Route>
            </Switch>
          </Suspense>
      </Router>
    </AuthContext.Provider>
  )
}

/* {page === 'previous' && <Previous page={page} previous={previous}/>}
{page === 'today' &&
  <Artist
    artist={artist}
    setLiked={setLiked}
    liked={liked}
    page={page}/>}
{page === 'leaderboard' && <Leaderboard board={leaderboard}/>}
{page === 'register' && <Register />}
{page === 'favorites' && <Favorites />} */