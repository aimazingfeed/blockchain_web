import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/ConfigStore'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <style>{'body { background-color: #0d1117; }'}</style>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);
