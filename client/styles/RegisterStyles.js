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

export const Features = styled.section`
  width: 50vw;
  margin-bottom: 50px;

  & h3 {

  }

  & li {
    list-style: none;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  & li i {
    margin-right: 0.5rem;
    color: var(--secondary-color);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  font-size: 1.3rem;
  font-weight: lighter;

  & label {
    margin-bottom: 0.5rem;
  }
  & input {
    border-radius: 5px;
    border: 1px solid var(--dark-gray);
    line-height: 1.5;
    padding-left: 10px;
    font-size: 1.3rem;
    color: var(--dark-gray);
    height: calc(2.25rem + 2px);
    width: 50vw;
  }
`;


export const Submit = styled.button`
  font-size: 1.3rem;
  letter-spacing: 2px;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 0.5rem;
  display: inline-block;
`;

export const ErrorMsg = styled.div`
  color: red;
  font-size: 1.1rem;
  margin: 20px 0;
`;