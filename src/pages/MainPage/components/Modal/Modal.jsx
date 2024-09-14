import ReactModal from 'react-modal';
import useModalStore from '../../../../store/useModalStore';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    minHeight: '80%',
    padding: '0 0 5vh 3vw',
    backgroundColor:"var(--sand-color)",
    color:"var(--brown-color)",
  },
  overlay: {
    backgroundColor: 'transparent',
    zIndex: '50'
  }
};

ReactModal.setAppElement('#root');

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
