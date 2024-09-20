import useRestaurantsStore from '../../store/useRestaurantsInfo';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({ toggleModal }) => {
  const info = useRestaurantsStore((state) => state.info);

  return (
    <aside className="fixed top-0 left-0 h-full w-[400px] bg-gray-100 shadow-md">
      <SidebarHeader toggleModal={toggleModal} />
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-72px)]">
        {info.map((el, index) => {
          return (
            <div key={index}>
              <p>{el.place_name}</p>
              <p>{el.address_name}</p>
              <p>{el.phone}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
