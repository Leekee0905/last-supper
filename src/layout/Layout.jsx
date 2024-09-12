import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
