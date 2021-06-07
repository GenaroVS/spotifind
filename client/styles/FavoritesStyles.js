import styled from 'styled-components';

export const FavCont = styled.section`
  box-sizing: border-box;
  width: 60%;
  margin: 0 auto;

  & > h1 {
    text-align: center;
    font-size: 3rem;
  }

  & > h3 {
    text-align: center;
  }

  & > div {
    margin-bottom: 20px;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  i.fa-times {
    position: absolute;
    right: -5%;
    top: 50%;
    font-size: 30px;
    transform: translateY(-50%);
    color: red;
    cursor: pointer;
    transition: transform 100ms linear;
  }

  i.fa-times:active {
    transform: scale(0.9);
  }
`;