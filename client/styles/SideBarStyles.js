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
  width: 250px;
  transition: transform 250ms ease-in;
  transform: ${props => !props.isToggled ? 'translateX(100%)' : 'translateX(0)'};
  background-color: var(--main-color);
`;

export const HeaderCont = styled.div`
  padding: 28px 20px;
  background-color: var(--lighter-color);
  overflow-x: hidden;
  white-space: nowrap;
`;

export const Header = styled.h2`
  text-align: left;
  margin: 0;
  width: 70%;
  letter-spacing: 2px;
  overflow-x: hidden;
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
  text-align: left;
  color: var(--dark-gray);
  padding: 1rem 0 1rem 25%;
  border-top: 1px solid rgba(255,255,255, 0.1);
  border-bottom: 1px solid var(--dark-gray);
  cursor: pointer;
  transition: all 100ms linear;

  &:hover,
  &:focus,
  &:active {
    padding-left: 30%;
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

  & i {
    margin-right: 10px;;
  }
`;

