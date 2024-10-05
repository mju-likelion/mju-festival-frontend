// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { useEffect } from 'react';
import GlobalStyle from './styles/GlobalStyle.ts';
import App from './App.tsx';
import { theme } from './styles';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  release: 'release version',
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {/* <React.StrictMode> */}
    <App />

    {/* </React.StrictMode> */}
  </ThemeProvider>
);
