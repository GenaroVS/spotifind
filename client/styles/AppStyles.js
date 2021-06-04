import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const Container = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Helvetica, sans-serif;
    overflow-x: hidden;
  }

  :root {
    --main-color: #1DB954;
    --light-color: #ADCE74;
    --lighter-color: #74D595;
    --secondary-color: #1E7E9E;
    --light-gray: #EEE;
    --dark-gray: #333;
  }
`;

export const highlight = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const Logo = styled.h1`
  font-size: 50px;
  margin-right: 200px;
  color: var(--dark-gray);
`;

export const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 100px;
`;

export const NavBtn = styled.button`
  flex: 1 0 auto;
  color: var(--dark-gray);
  background-color: var(--light-gray);
  font-size: 1.3rem;
  letter-spacing: 2px;
  border: none;
  border-radius: 10px;
  margin: 0 10px;
  padding: 0 1.2em;
  height: 75px;
  cursor: pointer;

  &:hover {
    animation: ${highlight} 1.5s cubic-bezier(.48,.3,.54,1.18);
    animation-iteration-count: infinite;
  }
`;

export const MainBtn = styled(NavBtn)`
  flex: 3 0 auto;
  background-color: var(--main-color);
  font-size: 1.5rem;
`;
