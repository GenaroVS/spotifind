import styled from 'styled-components';

export const Page = styled.section`
  box-sizing: border-box;
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 20px;
  }

  & > h1 {
    text-align: center;
    font-size: 3rem;
  }
`;