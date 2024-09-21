import useRestaurantsStore from '../../store/useRestaurantsInfo';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({ setDetailInfo }) => {
  const { info, setIsOpen } = useRestaurantsStore((state) => state);

  return (
    <aside className="fixed top-0 left-0 h-full w-[400px] bg-white shadow-md">
      <SidebarHeader />
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-72px)]">
        {info.map((el, index) => {
          return (
            <div
              key={index}
              style={{ border: '1px solid black', padding: '20px' }}
              onClick={() => {
                setDetailInfo(el);
                setIsOpen(true);
              }}
            >
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
