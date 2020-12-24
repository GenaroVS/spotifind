import React, { useEffect , useState} from 'react';
import axios from 'axios';

import NavBar from './components/NavBar.jsx';
import Artist from './components/Artist.jsx';

export default () => {
  const [artist, setArtist] = useState({});
  const [track, setTrack] = useState({});

  useEffect(() => {
    (async () => {
      const data = await axios.get('/api/newArtist')
        .then(res => {
          setArtist(res.data.resArtist);
          setTrack(res.data.resTrack);
        })
        .catch(err => console.log(err));
    })()
  }, [])

  return (
    <>
      <NavBar />
      <Artist />
    </>
  )
}