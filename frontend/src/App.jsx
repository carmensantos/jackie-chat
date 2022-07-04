import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import SignIn from './components/Auth/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  );
}

export default App;
