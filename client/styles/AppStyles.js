import styled, { createGlobalStyle } from 'styled-components';

const Container = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Helvetica, sans-serif;
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

const Logo = styled.h1`
  font-size: 50px;
  margin-right: 200px;
  color: var(--dark-gray);
`;

const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 100px;
`;

const NavBtn = styled.button`
  flex: 1 0 auto;
  color: var(--dark-gray);
  background-color: var(--light-gray);
  font-size: 1.3rem;
  letter-spacing: 2px;
  border: none;
  border-radius: 10px;
  margin: 0 10px;
  height: 75px;
`;

const MainBtn = styled(NavBtn)`
  flex: 3 0 auto;
  background-color: var(--main-color);
  font-size: 1.5rem;
`;

export {
  NavBar,
  NavBtn,
  MainBtn,
  Container,
  Logo
}