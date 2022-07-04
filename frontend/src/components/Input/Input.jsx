import React from 'react';

import '../Styling/styling.css';

function Input({ setMessage, sendMessage, message }) {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <button type="button" className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
    </form>
  );
}

export default Input;
