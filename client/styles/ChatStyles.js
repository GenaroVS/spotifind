import styled from 'styled-components';

export const ChatBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  width: 30%;
  height: 75vh;
`;

export const Messages = styled.ul`
  list-style-type: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: scroll;
  box-shadow: inset 23px 23px 46px #ededed,
              inset -23px -23px 46px #ffffff;

  & > li {
    padding: 0.5rem 1rem;
    overflow-wrap: break-word;
  }

  span {
    color: var(--main-color);
  }

  #typing {
    text-align: center;
  }
`;

export const MessageInput = styled.input`
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: .25rem;
  :focus {
    outline: none;
  }
`;

export const ChatForm = styled.form`
  background: var(--light-gray);
  padding: 0.25rem;
  display: flex;
  height: 3rem;

  & > button {
    background: var(--main-color);
    border: none;
    padding: 0 1rem;
    margin: 0.25rem;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    color: var(--light-gray);
  }
`;