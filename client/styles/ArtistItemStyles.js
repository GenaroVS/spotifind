import styled from 'styled-components';

export const Image = styled.img`
  width: 100px;
  height: 100px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
`;

export const Column = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

export const Link = styled.a`
  text-decoration: none;
  color: var(--dark-gray);

  &:hover {
    color: var(--main-color);
  }
`;

export const Rank = styled.div`
  display: grid;
  grid-template-columns: 15% 25% 20% 20% 20%;
  grid-template-rows: 100%;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 10px 0 10px 10px;
  border-radius: 5px;
  background-color: var(--light-gray);
  width: 100%;
`;