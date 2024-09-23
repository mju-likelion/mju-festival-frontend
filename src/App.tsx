import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
  RouterProvider,
} from 'react-router-dom';
import styled from 'styled-components';
import { TimeTableProvider } from './context/TimeTable.tsx';
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
import Map from './pages/Map/index.tsx';
import Stamp from './pages/Stamp/index.tsx';
import StampComplete from './pages/StampComplete/index.tsx';
import TimeTable from './pages/TimeTable/index.tsx';
import LostItem from './pages/ViewAllLostItem/index.tsx';
import ViewAllNotice from './pages/ViewAllNotice/index.tsx';
import DetailLostItem from './pages/ViewDetailLostItem/index.tsx';
import ViewDetailNotice from './pages/ViewDetailNotice/index.tsx';
import Footer from './components/Footer/index.tsx';

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/view/all-notices',
        element: <ViewAllNotice />,
      },
      {
        path: '/create/notice',
        element: <CreateNotice />,
      },
      {
        path: '/notice/:id/edit',
        element: <EditNotice />,
      },
      {
        path: '/booths',
        element: <Booth />,
      },
      {
        path: '/booths/:boothId',
        element: <BoothDetail />,
      },
      {
        path: '/booths/:boothId/edit',
        element: <BoothEdit />,
      },
      {
        path: '/login',
        element: <UserLogIn />,
      },
      {
        path: '/admin/login',
        element: <AdminLogIn />,
      },
      {
        path: '/view/detail-notice/:id',
        element: <ViewDetailNotice />,
      },
      {
        path: '/lost-items',
        element: <LostItem />,
      },
      {
        path: '/lost-items/:id',
        element: <DetailLostItem />,
      },
      {
        path: '/lost-items/:id/edit',
        element: <EditLostItem />,
      },
      {
        path: '/lost-items/register',
        element: <CreateLostItem />,
      },
      {
        path: '/timetable',
        element: (
          <TimeTableProvider>
            <TimeTable />
          </TimeTableProvider>
        ),
      },
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/stamps',
        element: <Stamp />,
      },
      {
        path: '/completed-stamps',
        element: <StampComplete />,
      },
    ],
  },
]);

function App() {
  useRouteTracker();
  useScreenSize();

  return (
    <MobileWrapper>
      <RouterProvider router={router} />
    </MobileWrapper>
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
  /* overflow-y: auto; */
  background-color: ${({ theme }) => theme.colors.white100};

  // 스크롤바 숨기기
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

export default App;
