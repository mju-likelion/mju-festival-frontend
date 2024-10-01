import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import Landing from './pages/Landing/index.tsx';
import Layout from './pages/Landing/Layout.tsx';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Landing />,
      },
    ],
  },
]);

function App() {
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
  background-color: #ffffff;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
