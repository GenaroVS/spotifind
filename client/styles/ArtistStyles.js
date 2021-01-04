import styled from 'styled-components';

const Page = styled.section`
  display: flex;
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
  padding: 0 100px;
  margin-bottom: 20px;
`;

const InfoCont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 30% 70%;
  width: 50%;
`;

const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  color: var(--dark-gray);

  &:hover {
    color: var(--main-color);
  }
`;

const Info = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  margin-left: 20px;
`;

const Image = styled.img`
  grid-area: 1 / 1 / 3 / 2;
  width: 100%;
  height: auto;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
`;

export {
  Page,
  InfoCont,
  Link,
  Info,
  Image
}