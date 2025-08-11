// /src/main.jsx

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ServerContext from './Context/ServerContext.jsx';
import  UserContext  from './Context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ServerContext>
        <UserContext>
          <App />
        </UserContext>
      </ServerContext>
    </BrowserRouter>
  </StrictMode>,
);
