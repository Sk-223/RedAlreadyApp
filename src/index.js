// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename='/'>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
