import React, { useState, useContext } from 'react';
import { ChatBox, Messages, MessageInput, ChatForm } from '../styles/ChatStyles';
import AuthContext from '../utils/context.js';

let socket = io();


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const user = useContext(AuthContext);

  socket.on('chat message', msg => {
    setMessageList([...messageList, msg]);
  });

  socket.on('has connected', () => {
    let msg = `${user.given_name || 'guest'} has connected`;
    setMessageList([...messageList, msg]);
  });

  socket.on('has disconnected', () => {
    let msg = `${user.given_name || 'guest'} has disconnected`;
    setMessageList([...messageList, msg]);
  });

  const sendHandler = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <ChatBox>
      <Messages>
        { messageList.map((message, i) => {
          return <li key={i}>{message}</li>
        })}
      </Messages>
      <ChatForm>
        <MessageInput
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type='text'
          placeholder='Chat and Discuss' />
        <button onClick={sendHandler}>Send</button>
      </ChatForm>
    </ChatBox>
  )
};

export default Chat;