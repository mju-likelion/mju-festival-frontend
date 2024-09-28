// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle.ts';
import App from './App.tsx';
import { theme } from './styles';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {/* <React.StrictMode> */}
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>

    {/* </React.StrictMode> */}
  </ThemeProvider>
);
