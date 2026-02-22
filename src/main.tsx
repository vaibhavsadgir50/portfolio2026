import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/* Set full URLs for mask images (GitHub Pages) */
const assetsBase = 'https://vaibhavsadgir50.github.io/portfolio2026';
document.documentElement.style.setProperty('--mask-nyu', `url(${assetsBase}/images/NYU.png)`);
document.documentElement.style.setProperty('--mask-siem', `url(${assetsBase}/images/siem.png)`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
