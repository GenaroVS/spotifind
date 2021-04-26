import styled from 'styled-components';

export const Toggle = styled.i`
  position: fixed;
  top: 25px;
  right: 25px;
  font-size: 30px;
  color: ${props => props.isToggled ? 'black' : 'var(--main-color)'};
  cursor: pointer;
  z-index: 100;
  transition: transform 100ms linear;

  &:active {
    transform: scale(0.9);
  }
`;

export const SideBarCont = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  height: 100vh;
  width: 200px;
  transition: transform 250ms ease-in;
  transform: ${props => !props.isToggled ? 'translateX(100%)' : 'translateX(0)'};
  background-color: var(--main-color);
`;

export const Header = styled.h2`
  text-align: left;
  padding: 28px 20px;
  margin: 0;
  background-color: var(--lighter-color);
  letter-spacing: 2px;
`;

export const Options = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const Feature = styled.li`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  list-style: none;
  letter-spacing: 2px;
  text-align: center;
  color: var(--dark-gray);
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255, 0.1);
  border-bottom: 1px solid var(--dark-gray);
  cursor: pointer;
  transition: all 100ms linear;

  &:hover,
  &:focus,
  &:active {
    padding-right: 1rem;
  }

  & button {
    border: none;
    background: transparent;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
    color: var(--dark-gray);
    cursor: pointer;
  }
`;

