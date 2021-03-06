import { useState, useEffect } from 'react';

const sortCB = (a, b, prop, isDecr) => {
  if (typeof a[prop] === 'string' && isDecr) {
    return a[prop] < b[prop] ? -1 : 1;
  } else if (typeof a[prop] === 'string' && !isDecr) {
    return a[prop] > b[prop] ? -1 : 1;
  }

  if (typeof a[prop] === 'number' && isDecr) {
    return b[prop] - a[prop];
  } else if (typeof a[prop] === 'number' && !isDecr) {
    return a[prop] - b[prop];
  }
};

const filter = (initial, query) => {
  let artists = [...initial];
  let { search, category, isDecr } = query;
  if (!search && !category) return initial;

  if (search) {
    artists = artists.filter(({ name, track }) => {
      let lowerName = name.toLowerCase();
      let lowerTrack = track.toLowerCase();
      let lowerSearch = search.toLowerCase();
      return lowerName.indexOf(lowerSearch) >= 0 ||
             lowerTrack.indexOf(lowerSearch) >= 0;
    });
  }

  if (category) {
    artists.sort((a, b) => sortCB(a, b, category, isDecr));
  }

  return artists;
};

const useArtistsFilter = (initial, query) => {
  const [filtered, setFiltered] = useState([]);
  let { search, category, isDecr } = query;

  useEffect(() => {
    let filteredFavs = filter(initial, query);
    setFiltered(filteredFavs);
  }, [search, category, isDecr]);

  return filtered.length > 0 ? filtered : initial;
};

export default useArtistsFilter;