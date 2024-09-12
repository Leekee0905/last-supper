import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home/Home';
import MainPage from '../pages/MainPage/MainPage';

const pages = createBrowserRouter([
  {
    path: '/mainpage',
    element: <Layout />,
    children: [
      {
        path: '/mainpage',
        element: <MainPage />
      }
    ]
  },
  {
    path: '/',
    element :<Home />,
  }
]);

const Router = () => <RouterProvider router={pages} />;

export default Router;