import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useAuth } from '@frontegg/react';
import Messages from '../Messages/Messages';
import TitleBar from '../TitleBar/TitleBar';
import Input from '../Input/Input';
import '../Styling/styling.css';

const ENDPOINT = 'ws://localhost:5000';
let socket;

function Chat({ location }) {
  const [chatRoom, setChatRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT, {
      withCredentials: false,
    });

    setChatRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (socketMessage) => {
      setMessages((prevMessages) => [...prevMessages, socketMessage]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <TitleBar room={chatRoom} />
        <Messages messages={messages} name={user.name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
