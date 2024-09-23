import { FiMenu } from 'react-icons/fi';
import AutoComplete from '../../components/AutoComplete';
import { useHamburgerStore } from '../../store/useHamburgerStore';

const SidebarHeader = () => {
  const setIsHamburgerMenuOpen = useHamburgerStore((state) => state.setIsHamburgerMenuOpen);
  return (
    <div className="sticky top-0 bg-[--dark-khaki-color] p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center mr-5">
          <button className="flex flex-col items-center cursor-pointer text-white" onClick={() => setIsHamburgerMenuOpen(true)}>
            <FiMenu className="text-2xl" />
            <span className="text-xs mt-1">메뉴</span>
          </button>
        </div>
        <AutoComplete />
      </div>
    </div>
  );
};

export default SidebarHeader;
