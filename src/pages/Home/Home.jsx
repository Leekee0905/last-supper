import React from 'react';
import useModalStore from '../../store/useModalStore';
import Modal from '../MainPage/components/Modal/Modal';


// Modal.setAppElement('#yourAppElement');

const Home = () => {
  const hasOpenModal = useModalStore((state) => state.setHasOpen);
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);

  return (
    <div>
      <button onClick={hasOpenModal}>Open Modal</button>
      <Modal>
        <button onClick={setHasModalOpen}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;