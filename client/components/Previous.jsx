import React from 'react';
import styled from 'styled-components';
import ArtistBanner from './ArtistBanner.jsx';
import { v4 as uuidv4 } from 'uuid';

const Page = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    margin-bottom: 50px;
  }
`;

export default ({ previous }) => {

  return (
    <Page>
      {previous.map(artist => {
        return <ArtistBanner key={uuidv4()} artist={artist} />
      })}
    </Page>
  )
};