import styled from 'styled-components';

const Page = styled.ul`
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
  padding: 0 100px;
`;


const Rank = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px 0 10px 10px;
  border-radius: 5px;
  background-color: var(--light-gray);
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

const Image = styled.img`
  width: 100px;
  height: 100px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
`;

const Column = styled.span`
  width: 20%;
  text-align: center;
`;

export {
  Page,
  Header,
  Rank,
  Image,
  Column
}