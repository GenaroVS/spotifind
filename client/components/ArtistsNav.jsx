import React, { useState, useEffect, useCallback } from 'react';
import { Header, Label, SearchCont } from '../styles/ArtistsNavStyles.js';
import debounce from 'lodash/debounce';


const ArtistsNav = ({ setSearch, setCategory, isDecr, setIsDecr }) => {
  const [input, setInput] = useState('');
  const search = (val) => setSearch(val);
  const delayedSearch = useCallback(debounce(search, 1000), []);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    delayedSearch(e.target.value);
  }
  const categoryHandler = (e) => {
    setCategory(prevCategory => {
      let category = e.target.dataset.category;
      prevCategory === category ? setIsDecr(!isDecr) : setIsDecr(true);
      return category;
    });
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
      <Label onClick={categoryHandler} data-category='name'>Artist</Label>
      <Label onClick={categoryHandler} data-category='track'>Track</Label>
      <Label onClick={categoryHandler} data-category='likes'>Likes</Label>
    </Header>
  )
};

export default ArtistsNav;