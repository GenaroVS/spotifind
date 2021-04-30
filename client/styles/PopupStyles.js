import styled from 'styled-components';

export const PopupCont = styled.div`
  visibility: hidden;
  position: absolute;
  top: 110%;
  left: 10%;
  background-color: var(--dark-gray);
  opacity: 0;
  color: var(--light-gray);
  transition: opacity 100ms linear;
  white-space: nowrap;
  font-size: 0.75rem;
  padding: 2px;
  border-radius: 4px;

  &.open {
    visibility: visible;
    opacity: 0.8;
  }
`;