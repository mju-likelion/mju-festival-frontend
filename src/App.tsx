import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from './styles';
import GlobalStyle from './styles/GlobalStyle';
import useRouteTracker from './hooks/useRouteTracker.tsx';
import Index from './pages/Main';
import ViewAllNotice from './pages/ViewAllNotice/index.tsx';
import Booth from './pages/Booth';
import UserLogIn from './pages/LogIn/indexUser.tsx';
import AdminLogIn from './pages/LogIn/indexAdmin.tsx';

function App() {
  useRouteTracker();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/view/all-notices" element={<ViewAllNotice />} />
          <Route path="/booths" element={<Booth />} />
          <Route path="/login" element={<UserLogIn />} />
          <Route path="/admin/login" element={<AdminLogIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
