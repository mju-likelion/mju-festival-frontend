import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from './styles';
import GlobalStyle from './styles/GlobalStyle';
import useRouteTracker from './hooks/useRouteTracker.tsx';
import Main from './pages/Main.tsx';
import UserLogIn from './pages/LogIn/indexUser.tsx';
import AdminLogIn from './pages/LogIn/indexAdmin.tsx';

function App() {
  useRouteTracker();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<UserLogIn />} />
          <Route path="/admin/login" element={<AdminLogIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
