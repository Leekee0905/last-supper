import useModalStore from '../../../../store/useModalStore';
import Modal from '../Modal/Modal';

const MyPage = ({ children }) => {
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);

  return (
    <Modal>
      <aside>
        <h2>마이페이지</h2>
        <nav>개인 정보</nav>
        <nav>즐겨찾기</nav>
        <nav>내 리뷰</nav>
      </aside>
      <section>{children}</section>
      <button onClick={setHasModalOpen}>X</button>
    </Modal>
  );
};

export default MyPage;
