import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n';
import App from './App.tsx';
import Analytics from './components/Analytics';

type Gtag = (...args: unknown[]) => void;

interface GAWindow extends Window {
  dataLayer?: unknown[][];
  gtag?: Gtag;
  __gaInitialized?: boolean;
}

const GA_ID: string = String(import.meta.env.VITE_GA_MEASUREMENT_ID ?? '');

function initGA(id: string, w: GAWindow = window as GAWindow): void {
  if (!id) return;
  if (w.__gaInitialized) return;
  w.__gaInitialized = true;

  w.dataLayer = w.dataLayer ?? [];
  w.gtag = (...args: unknown[]): void => {
    (w.dataLayer as unknown[][]).push(args);
  };

  const s: HTMLScriptElement = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head?.appendChild(s);

  w.gtag('js', new Date());
  w.gtag('config', id, { send_page_view: false });
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