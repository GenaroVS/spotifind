import React, { useEffect , useState} from 'react';
import axios from 'axios';

//import NavBar from './components/NavBar.jsx';
import Artist from './components/Artist.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import Previous from './components/Previous.jsx';

export default () => {
  const [artist, setArtist] = useState({});
  const [page, setPage] = useState('');

  useEffect(() => {
    (async () => {
      const data = await axios.get('/api/newArtist')
        .then(artist => {
          setArtist(artist.data);
        })
        .catch(err => console.log(err));
    })()
  }, [])

  return (
    <>
      <nav>
        <div onClick={e => setPage(e.target.id)} id='previous'> Previous Days </div>
        <div onClick={e => setPage(e.target.id)} id='today'> Today's Song </div>
        <div onClick={e => setPage(e.target.id)} id='leaderboard'> Leaderboard </div>
      </nav>
      {page === 'today' && <Artist artist={artist} />}
      {page === 'leaderboard' && <Leaderboard />}
      {page === 'previous' && <Previous />}
    </>
  )
}