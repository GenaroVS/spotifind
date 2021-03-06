import React, { useEffect , useState, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import SideBar from './components/SideBar.jsx';
import { Logo, Container, NavBar, NavBtn, MainBtn } from './styles/AppStyles.js';
import { AuthContext } from './utils/context.js';

const Today = lazy(() => import(
  /* webpackChunkName: "Artist" */
  /* webpackPrefetch: true */
  './components/Today.jsx'
));
const Leaderboard = lazy(() => import(
  /* webpackChunkName: "Leaderboard" */
  /* webpackPrefetch: true */
  './components/LeaderBoard.jsx'
));
const Previous = lazy(() => import(
  /* webpackChunkName: "Previous" */
  /* webpackPrefetch: true */
  './components/Previous.jsx'
));
const Register = lazy(() => import(
  /* webpackChunkName: "Register" */
  './components/Register.jsx'
));
const Favorites = lazy(() => import(
  /* webpackChunkName: "Favorites" */
  './components/Favorites.jsx'
));


export default () => {
  const [artist, setArtist] = useState({});
  const [previous, setPrevious] = useState([]);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(async () => {
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
              <NavBtn> Previous Days </NavBtn>
            </Link>
            <Link to='/today'>
              <MainBtn> Today's Song </MainBtn>
            </Link>
            <Link to='/leaderboard'>
              <NavBtn> Leaderboard </NavBtn>
            </Link>
          </NavBar>
          <SideBar/>
          <Suspense fallback={<h1 style={{textAlign: 'center'}}>Loading...</h1>}>
            <Switch>
              <Route path='/previous'>
                <Previous previous={previous}/>
              </Route>
              <Route path='/today'>
                <Today
                  artist={artist}
                  setLiked={setLiked}
                  liked={liked}/>
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