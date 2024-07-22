import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from './styles';
import GlobalStyle from './styles/GlobalStyle';
import RouteChangeTracker from './components/RouteChangeTracker.tsx';
import Main from './pages/Main.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouteChangeTracker />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
