import React, { useState, useEffect, useCallback } from 'react';
import { Header, Label, SearchInput } from '../styles/ArtistsNavStyles.js';
import debounce from 'lodash/debounce';

let categories = [
  {data: 'name', label: 'Artist'},
  {data: 'track', label: 'Track'},
  {data: 'likes', label: 'Likes'}
];

const ArtistsNav = ({
  setSearch, currentCategory, setCategory, isDecr, setIsDecr
}) => {
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

  const getLabelsWithStyles = () => {
    return categories.map((category, i) => {
      let color = '';
      if (currentCategory === category.data) {
        isDecr ? color = 'main' : color = 'red';
      } else {
        color = 'gray';
      }

      return <Label
        key={i}
        color={color}
        onClick={categoryHandler}
        data-category={category.data}>
          {category.label}
        </Label>
    })
  }

  useEffect(() => delayedSearch.cancel, [])

  return (
    <Header>
      <SearchInput
        onChange={onChangeHandler}
        type='text'
        placeholder='Artist or Track'
        value={input} />
      { getLabelsWithStyles() }
    </Header>
  )
};

export default ArtistsNav;