import React, { useEffect , useState } from 'react';
import axios from 'axios';

import Artist from './components/Artist.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import Previous from './components/Previous.jsx';
import { Logo, Container, NavBar, NavBtn, MainBtn } from './styles/AppStyles.js';

export default () => {
  const [artist, setArtist] = useState({});
  const [previous, setPrevious] = useState([]);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [page, setPage] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    (async () => {
      await axios.get('/api/newArtist')
        .then(artist => setArtist(artist.data))
        .catch(err => console.log(err));
      await axios.get('/api/prevArtists')
        .then(artists => setPrevious(artists.data.slice(1)))
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
    <>
      <Container />
      <NavBar>
        <Logo> Spotifind </Logo>
        <NavBtn onClick={e => setPage(e.target.id)} id='previous'> Previous Days </NavBtn>
        <MainBtn onClick={e => setPage(e.target.id)} id='today'> Today's Song </MainBtn>
        <NavBtn onClick={e => setPage(e.target.id)} id='leaderboard'> Leaderboard </NavBtn>
      </NavBar>
      {page === 'previous' && <Previous previous={previous} page={page}/>}
      {page === 'today' && <Artist artist={artist} setLiked={setLiked} liked={liked}/>}
      {page === 'leaderboard' && <Leaderboard board={leaderboard}/>}
    </>
  )
}