import useUserStore from '../../store/useUserStore';
import HamburgerItem from './HamburgerItem';

const HamburgerContents = () => {
  const hasLoggedIn = useUserStore((state) => state.hasAuthenticated);

  return (
    <header className="p-4">
      <div className="flex flex-col items-start space-y-4 pl-4">
        {hasLoggedIn ? (
          <>
            <HamburgerItem icon={'mypage'} text="마이페이지" />
            <HamburgerItem icon="logout" text="로그아웃" />
          </>
        ) : (
          <>
            <HamburgerItem icon={'login'} text={'로그인'} />
            <HamburgerItem icon="signup" text="회원가입" />
          </>
        )}
        <HamburgerItem icon="calculator" text="전역일 계산기" />
      </div>
    </header>
  );
};

export default HamburgerContents;
