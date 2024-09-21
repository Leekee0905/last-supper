import { FiMenu } from 'react-icons/fi';
import AutoComplete from '../../components/AutoComplete';
import { useHamburgerStore } from '../../store/useHamburgerStore';

const SidebarHeader = () => {
  const setIsHamburgerMenuOpen = useHamburgerStore((state) => state.setIsHamburgerMenuOpen);
  return (
    <div className="sticky top-0 bg-[--dark-khaki-color] p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center mr-5">
          <FiMenu className="text-2xl cursor-pointer text-white" onClick={() => setIsHamburgerMenuOpen(true)} />
          <span className="text-xs text-white mt-1">메뉴</span>
        </div>
        <AutoComplete />
      </div>
    </div>
  );
};

export default SidebarHeader;
