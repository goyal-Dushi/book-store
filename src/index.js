import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import AlertContextWrapper from './contexts/AlertContextWrapper';
import UserContextWrapper from './contexts/UserContextWrapper';

ReactDOM.render(
  <AlertContextWrapper>
    <UserContextWrapper>
      <App />
    </UserContextWrapper>
  </AlertContextWrapper>,
  document.getElementById('root')
);
