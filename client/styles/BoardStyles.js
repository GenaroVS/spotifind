import styled from 'styled-components';

const Page = styled.section`
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto auto 20% 35% 20%;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--secondary-color);
  letter-spacing: 2px;
`;

export {
  Page,
  Header
}