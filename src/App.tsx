import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
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
import Landing from './pages/Landing/index.tsx';
import Layout from './pages/Landing/Layout.tsx';
import AdminLogIn from './pages/LogIn/indexAdmin.tsx';
import UserLogIn from './pages/LogIn/indexUser.tsx';
import Main from './pages/Main/index.tsx';
import Map from './pages/Map/index.tsx';
import NotFound from './pages/NotFound';
import QrReader from './pages/QrReader/index.tsx';
import Setting from './pages/Setting/index.tsx';
import Stamp from './pages/Stamp/index.tsx';
import StampComplete from './pages/StampComplete/index.tsx';
import TimeTable from './pages/TimeTable/index.tsx';
import LostItem from './pages/ViewAllLostItem/index.tsx';
import ViewAllNotice from './pages/ViewAllNotice/index.tsx';
import DetailLostItem from './pages/ViewDetailLostItem/index.tsx';
import ViewDetailNotice from './pages/ViewDetailNotice/index.tsx';

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/main',
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
        element: <TimeTable />,
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
      {
        path: '/qr-reader',
        element: <QrReader />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },
      {
        path: '/*',
        element: <NotFound />,
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Pretendard Variable', Pretendard, sans-serif;
  width: 100%;
  max-width: 430px;
  height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white100};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
