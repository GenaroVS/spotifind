import React, { useState } from 'react';
import { Header, Label, SearchCont } from '../styles/ArtistsNavStyles.js';
import throttle from 'lodash/throttle';

const ArtistsNav = ({ setSearch, setCategory }) => {
  const [input, setInput] = useState('');

  const onChangeHandler = throttle((e) => {
    setInput(e.target.value);
  }, 10000, { leading: true });

  const onSubmitHandler = () => {
    setSearch(input)
    setInput('');
  };

  return (
    <Header>
      <SearchCont>
        <input
          onChange={onChangeHandler}
          type='text'
          placeholder='title or track'
          value={input}></input>
        <button onClick={onSubmitHandler}> Search </button>
      </SearchCont>
      <Label onClick={(e) => setCategory(e.target.textContent)}>Artist</Label>
      <Label onClick={(e) => setCategory(e.target.textContent)}>Track</Label>
      <Label onClick={(e) => setCategory(e.target.textContent)}>Likes</Label>
    </Header>
  )
};

export default ArtistsNav;