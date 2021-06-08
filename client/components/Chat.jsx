import React, { useState, useContext } from 'react';
import { ChatBox, Messages, MessageInput, ChatForm } from '../styles/ChatStyles';
import { AuthContext } from '../utils/context.js';

let socket = io();


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const user = useContext(AuthContext);

  socket.on('connect', () => {
    socket.volatile.emit('add user', user)
  })

  socket.on('message', payload => {
    setMessageList([...messageList, payload]);
  });

  socket.on('typing', payload => {
    let { id, isTyping, user } = payload;
    let newTypingUsers = {...typingUsers};
    if (isTyping) {
      newTypingUsers[id] = user
      setTypingUsers(newTypingUsers);
    } else {
      delete newTypingUsers[id];
      setTypingUsers(newTypingUsers);
    }
  });

  const sendHandler = (e) => {
    e.preventDefault();
    let msgObj = {
      label: user.name || 'Guest',
      msg: message
    }
    socket.emit('message', message);
    socket.emit('typing', false);
    setMessageList([...messageList, msgObj]);
    setMessage('');
  };

  const typingHandler = (e) => {
    let val = e.target.value;

    if (val === '') {
      socket.emit('typing', false);
    } else if (message === '') {
      socket.emit('typing', true);
    }
    setMessage(val);
  };

  const displayTypingUsers = () => {
    let users = [];
    for (let id in typingUsers) {
      users.push(<li id='typing'>{`${typingUsers[id]} is typing...`}</li>)
    }
    return users;
  };

  return (
    <ChatBox>
      <Messages>
        { messageList.map((item, i) => {
          let label = item.label ? <span>{`${item.label}: `}</span> : null;
          return <li key={i}>{label}{item.msg}</li>
        })}
        { displayTypingUsers() }
      </Messages>
      <ChatForm>
        <MessageInput
          onChange={typingHandler}
          value={message}
          type='text'
          placeholder='Chat and Discuss' />
        <button onClick={sendHandler}>Send</button>
      </ChatForm>
    </ChatBox>
  )
};

export default Chat;