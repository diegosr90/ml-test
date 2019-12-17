import React from 'react'
import { hydrate } from 'react-dom'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
// Aca se deberia llamar a hydrate en production
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);