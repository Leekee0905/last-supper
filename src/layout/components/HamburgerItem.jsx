import React from 'react';
import { FiLogIn, FiLogOut, FiUserPlus, FiCalendar, FiBookmark } from 'react-icons/fi';
import useModalStore from '../../store/useModalStore';
import useUserStore from '../../store/useUserStore';

// 호버 효과 스타일을 반환하는 함수
const getHoverEffectStyles = () => `
  absolute bottom-[-5px] left-0 w-full h-[2px] bg-[#6B8E23]
  scale-x-0 group-hover:scale-x-100
  transition-transform duration-300
`;

const getIconStyles = () => `
  text-2xl text-gray-600 
`;

const HamburgerItem = ({ icon, text, setIsModalOpen }) => {
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  const setModalType = useModalStore((state) => state.setModalType);
  const setHasAuthenticated = useUserStore((state) => state.setHasAuthenticated);

  const handleClickHamburgerMenu = () => {
    if (text === '로그아웃') {
      setHasAuthenticated(false);
      setHasModalOpen(false);
      localStorage.clear();
      return;
    }
    setIsModalOpen(false);
    setModalType(icon);
    setHasModalOpen(true);
  };
  const renderIcon = () => {
    switch (icon) {
      case 'login':
        return <FiLogIn className={getIconStyles()} />;
      case 'logout':
        return <FiLogOut className={getIconStyles()} />;
      case 'signup':
        return <FiUserPlus className={getIconStyles()} />;
      case 'calculator':
        return <FiCalendar className={getIconStyles()} />;
      case 'bookmark':
        return <FiBookmark className={getIconStyles()} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer relative group"
      onClick={() => handleClickHamburgerMenu()}
    >
      {renderIcon()}
      <span className="text-gray-600">{text}</span>
      <span className={getHoverEffectStyles()}></span>
    </div>
  );
};

export default HamburgerItem;
