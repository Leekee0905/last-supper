import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home/Home';
import MainPage from '../pages/MainPage/MainPage';

const pages = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/mainpage',
        element: <MainPage />
      }
    ]
  }
]);

const Router = () => <RouterProvider router={pages} />;

export default Router;
