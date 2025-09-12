import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n';
import App from './App.tsx';
import Analytics from './components/Analytics';

const GA_ID: string = String(import.meta.env.VITE_GA_MEASUREMENT_ID ?? '');

function initGA(id: string): void {
  if (!id || window.__gaInitialized) return;
  window.__gaInitialized = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]): void => {
    window.dataLayer!.push(args);
  };

  const s: HTMLScriptElement = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);

  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
}

if (import.meta.env.PROD) initGA(GA_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics />
      <App />
    </BrowserRouter>
  </StrictMode>,
);