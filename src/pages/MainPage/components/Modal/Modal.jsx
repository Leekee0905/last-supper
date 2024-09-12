import ReactModal from 'react-modal';
import useModalStore from '../../../../store/useModalStore';

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

const Modal = ({ children }) => {
  const hasModalOpen = useModalStore((state) => state.hasOpen);
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  return (
    <ReactModal isOpen={hasModalOpen} style={customStyles}>
      {children}
    </ReactModal>
  );
};

export default Modal;
