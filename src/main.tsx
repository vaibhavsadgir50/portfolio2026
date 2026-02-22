import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/* Set base URL for assets (GitHub Pages subpath) */
const base = import.meta.env.BASE_URL;
document.documentElement.style.setProperty('--mask-nyu', `url(${base}images/NYU.png)`);
document.documentElement.style.setProperty('--mask-siem', `url(${base}images/siem.png)`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
