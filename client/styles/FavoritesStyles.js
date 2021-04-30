import styled from 'styled-components';

export const FavCont = styled.section`
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
  padding: 0 100px;

  h1 {
    text-align: center;
    font-size: 3rem;
  }

  h3 {
    text-align: center;
  }
`;

export const List = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const Favorite = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  i.fa-times {
    margin-left: 20px;
    font-size: 30px;
    color: red;
    cursor: pointer;
    transition: transform 100ms linear;
  }

  i.fa-times:active {
    transform: scale(0.9);
  }
`;