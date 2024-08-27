import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from './styles';
import GlobalStyle from './styles/GlobalStyle';
import useRouteTracker from './hooks/useRouteTracker.tsx';
import ViewAllNotice from './pages/ViewAllNotice/index.tsx';
import Booth from './pages/BoothList';
import BoothDetail from './pages/BoothDetail';
import BoothEdit from './pages/BoothEdit';
import UserLogIn from './pages/LogIn/indexUser.tsx';
import AdminLogIn from './pages/LogIn/indexAdmin.tsx';
import ViewDetailNotice from './pages/ViewDetailNotice/index.tsx';
import Main from './pages/Main/index.tsx';
import CreateNotice from './pages/CreateNotice/index.tsx';
import LostItem from './pages/ViewAllLostItem/index.tsx';
import DetailLostItem from './pages/ViewDetailLostItem/index.tsx';

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
          <Route path="/booths/:boothId" element={<BoothDetail />} />
          <Route path="/booths/:boothId/edit" element={<BoothEdit />} />
          <Route path="/login" element={<UserLogIn />} />
          <Route path="/admin/login" element={<AdminLogIn />} />
          <Route
            path="/view/detail-notice/:id"
            element={<ViewDetailNotice />}
          />
          <Route path="/lostItem" element={<LostItem />} />
          <Route path="/lostItem/detail" element={<DetailLostItem />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
