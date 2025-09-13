import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n';
import App from './App.tsx';
import Analytics from './components/Analytics';
import { GA_ID, TRACKING_ENABLED } from './config/analytics';

function initGA(id: string): void {
  if (!id || window.__gaInitialized) return;
  window.__gaInitialized = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]): void => {
    window.dataLayer!.push(args as unknown);
  };

  const s: HTMLScriptElement = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);

  const gtag = window.gtag as Gtag;
  gtag('js', new Date());
  gtag('config', id, { send_page_view: false });
}

if (TRACKING_ENABLED) initGA(GA_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
