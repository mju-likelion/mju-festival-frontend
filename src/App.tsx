import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from './styles';
import GlobalStyle from './styles/GlobalStyle';
import useRouteTracker from './hooks/useRouteTracker.tsx';
import ViewAllNotice from './pages/ViewAllNotice/index.tsx';
import Booth from './pages/Booth';
import BoothDetail from './pages/Booth/BoothDetail.tsx';
import UserLogIn from './pages/LogIn/indexUser.tsx';
import AdminLogIn from './pages/LogIn/indexAdmin.tsx';
import ViewDetailNotice from './pages/ViewDetailNotice/index.tsx';
import Main from './pages/Main/index.tsx';
import CreateNotice from './pages/CreateNotice/index.tsx';
import LostItem from './pages/ViewAllLostItem/index.tsx';
import DetailLostItem from './pages/ViewDetailLostItem/index.tsx';
import CreateLostItem from './pages/CreateLostItem/index.tsx';

function App() {
  useRouteTracker();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/view/all-notices" element={<ViewAllNotice />} />
          <Route path="/create/notice" element={<CreateNotice />} />
          <Route path="/booths" element={<Booth />} />
          <Route path="/booth/:boothId" element={<BoothDetail />} />
          <Route path="/login" element={<UserLogIn />} />
          <Route path="/admin/login" element={<AdminLogIn />} />
          <Route
            path="/view/detail-notice/:id"
            element={<ViewDetailNotice />}
          />
          <Route path="/lostItems" element={<LostItem />} />
          <Route path="/lostItems/detail" element={<DetailLostItem />} />
          <Route path="/lostItems/new" element={<CreateLostItem />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
