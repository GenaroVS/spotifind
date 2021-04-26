import styled from 'styled-components';

const Image = styled.img`
  width: 100px;
  height: 100px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
`;

const Column = styled.span`
  width: 20%;
  text-align: center;
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

export {
  Image,
  Column,
  Rank
}