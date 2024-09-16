import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import useRouteTracker from './hooks/useRouteTracker.tsx';
import useScreenSize from './hooks/useScreenSize.ts';
import BoothDetail from './pages/BoothDetail';
import BoothEdit from './pages/BoothEdit';
import Booth from './pages/BoothList';
import CreateLostItem from './pages/CreateLostItem/index.tsx';
import CreateNotice from './pages/CreateNotice/index.tsx';
import EditLostItem from './pages/EditLostItem/index.tsx';
import EditNotice from './pages/EditNotice/index.tsx';
import AdminLogIn from './pages/LogIn/indexAdmin.tsx';
import UserLogIn from './pages/LogIn/indexUser.tsx';
import Main from './pages/Main/index.tsx';
import LostItem from './pages/ViewAllLostItem/index.tsx';
import ViewAllNotice from './pages/ViewAllNotice/index.tsx';
import DetailLostItem from './pages/ViewDetailLostItem/index.tsx';
import ViewDetailNotice from './pages/ViewDetailNotice/index.tsx';

function App() {
  useRouteTracker();
  useScreenSize();

  return (
    <BrowserRouter>
      <MobileWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/view/all-notices" element={<ViewAllNotice />} />
          <Route path="/create/notice" element={<CreateNotice />} />
          <Route path="/notice/:id/edit" element={<EditNotice />} />
          <Route path="/booths" element={<Booth />} />
          <Route path="/booths/:boothId" element={<BoothDetail />} />
          <Route path="/booths/:boothId/edit" element={<BoothEdit />} />
          <Route path="/login" element={<UserLogIn />} />
          <Route path="/admin/login" element={<AdminLogIn />} />
          <Route
            path="/view/detail-notice/:id"
            element={<ViewDetailNotice />}
          />
          <Route path="/lost-items" element={<LostItem />} />
          <Route path="/lost-items/:id" element={<DetailLostItem />} />
          <Route path="/lost-items/:id/edit" element={<EditLostItem />} />
          <Route path="/lost-items/register" element={<CreateLostItem />} />
        </Routes>
      </MobileWrapper>
    </BrowserRouter>
  );
}

const MobileWrapper = styled.div`
  font-family: 'Pretendard Variable', Pretendard, sans-serif;
  // 확정 전 임의로 px 설정
  /* min-width: 360px; */
  width: 100%;
  max-width: 430px;
  height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  overflow-y: auto;
  background-color: #ffffff;
`;

export default App;
