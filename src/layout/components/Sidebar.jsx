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
              className="p-[20px] bg-[--khaki-color] bounded-[16px] cursor-pointer"
              onClick={() => {
                setDetailInfo(el);
                setIsOpen(true);
              }}
            >
              <p className="text-[24px] font-black">{el.place_name}</p>
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
