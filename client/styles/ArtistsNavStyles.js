import styled from 'styled-components';

export const SearchInput = styled.input`
  padding-left: 5px;
  font-size: 1.2rem;
  border: 1px solid var(--dark-gray);
  ::placeholder {
    font-size: 1.2rem;
  }
  :focus {
    outline: none;
  }
`;

export const Label = styled.div`
  color: ${props => props.color === 'main' ? 'var(--main-color)' : props.color};
  text-align: center;
  cursor: pointer;
  font-size: 1.3rem;
  place-self: center;
  letter-spacing: 1px;

  :hover,
  :active {
    color: var(--secondary-color);
  }

`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  grid-template-rows: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 3px solid var(--main-color);
`;