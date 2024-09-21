import { FiX } from 'react-icons/fi';
import HamburgerContents from './HamburgerContents';
import { useHamburgerStore } from '../../store/useHamburgerStore';

const HamburgerMenu = () => {
  const isHamburgerMenuOpen = useHamburgerStore((state) => state.isHamburgerMenuOpen);
  const setIsHamburgerMenuOpen = useHamburgerStore((state) => state.setIsHamburgerMenuOpen);
  return (
    <>
      {isHamburgerMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-md transform ${
          isHamburgerMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsHamburgerMenuOpen(false)}>
            <FiX className="text-2xl text-gray-600" />
          </button>
        </div>
        <HamburgerContents />
      </div>
    </>
  );
};

export default HamburgerMenu;
