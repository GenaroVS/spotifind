import styled from 'styled-components';

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
  padding: 0 100px;
  margin-bottom: 20px;
`;

export const Link = styled.a`
  display: inline-block;
  justify-content: flex-end;
  text-decoration: none;
  color: var(--dark-gray);
  font-size: 24px !important;

  &:hover {
    color: var(--main-color);
  }
`;

export const InfoCont = styled.div`
  display: flex;
  background-image:
    linear-gradient(
      rgba(255, 255, 255) 0%,
      rgba(255, 255, 255, 0.4) 20%,
      transparent),
    url(${props => props.photoUrl});
  background-size: cover;
  width: 1000px;
  height: 1000px;
  padding: 15px;
`;

export const Info = styled.div`
  width: 100%;

  & > * {
    margin-bottom: 5px;
    font-size: 20px;
  }

  & span {
    position: relative;
    cursor: pointer;
    margin-left: 10px;
  }

  & span .fa-heart {
    color: red;
    transition: transform 100ms linear;
  }

  & span .fa-heart:active {
    transform: scale(0.8);
  }

  & span .fa-star {
    color: var(--main-color);
    transition: transform 100ms linear;
  }

  & span .fa-star:active {
    transform: scale(0.8);
  }
`;