import React, { useState, useEffect, useCallback } from 'react';
import { Header, Label, SearchCont } from '../styles/ArtistsNavStyles.js';
import debounce from 'lodash/debounce';


const ArtistsNav = ({ setSearch, setCategory }) => {
  const [input, setInput] = useState('');
  const search = (val) => setSearch(val);
  const delayedSearch = useCallback(debounce(search, 1000), []);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    delayedSearch(e.target.value);
  }

  useEffect(() => delayedSearch.cancel, [])

  return (
    <Header>
      <SearchCont>
        <input
          onChange={onChangeHandler}
          type='text'
          placeholder='title or track'
          value={input}></input>
      </SearchCont>
      <Label onClick={(e) => setCategory(e.target.textContent)}>Artist</Label>
      <Label onClick={(e) => setCategory(e.target.textContent)}>Track</Label>
      <Label onClick={(e) => setCategory(e.target.textContent)}>Likes</Label>
    </Header>
  )
};

export default ArtistsNav;