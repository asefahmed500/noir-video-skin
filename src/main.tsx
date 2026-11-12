import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/animations.css';
import './styles/player.css';
import './styles/controls.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
