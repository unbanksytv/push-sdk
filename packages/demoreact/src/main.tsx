import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

const container = document.getElementById('root');
render((
  <StrictMode>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
), container);
