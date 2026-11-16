import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const host = document.getElementById('root');
if (!host) throw new Error('Root element #root is missing from the document.');

createRoot(host).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
