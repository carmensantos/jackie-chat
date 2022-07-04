import React from 'react';
import ReactDOM from 'react-dom';
import { FronteggProvider } from '@frontegg/react';

import App from './App';

const contextOptions = {
  baseUrl: '',
  clientId: '',
};

ReactDOM.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox>
    <App />
  </FronteggProvider>,
  document.getElementById('root'),
);
