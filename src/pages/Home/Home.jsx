import { useState } from 'react';
import ReactModal from 'react-modal';
import useModalStore from '../../store/useModalStore';
import Modal from '../MainPage/components/Modal/Modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
const Home = () => {
  const hasOpenModal = useModalStore((state) => state.setHasOpen);

  return (
    <div>
      <button onClick={hasOpenModal}>Open Modal</button>
      <Modal>
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
