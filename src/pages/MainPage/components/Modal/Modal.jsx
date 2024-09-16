import ReactModal from 'react-modal';
import useModalStore from '../../../../store/useModalStore';
import { useRef } from 'react';

ReactModal.setAppElement('#root');

const Modal = ({ children, contentStyle, overlayStyle }) => {
  const hasModalOpen = useModalStore((state) => state.hasOpen);
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);

  const modalRef = useRef();

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setHasModalOpen(false);
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      minWidth: '80%',
      minHeight: '80%',
      padding: '0 0 5vh 3vw',
      animation: 'slr 0.5s ease forwards',
      backgroundColor: 'var(--sand-color)',
      color: 'var(--brown-color)',
      ...contentStyle
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      ...overlayStyle
    }
  };

  return (
    <ReactModal isOpen={hasModalOpen} style={customStyles}>
      {children}
    </ReactModal>
  );
};

export default Modal;
