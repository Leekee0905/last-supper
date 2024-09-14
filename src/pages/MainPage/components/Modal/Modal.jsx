import ReactModal from 'react-modal';
import useModalStore from '../../../../store/useModalStore';
import ReactDOM from 'react-dom';

const customStyles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    minHeight: '80%'
  },
  overlay: {
    backgroundColor: 'transparent',
    zIndex: '50'
  }
};

ReactModal.setAppElement('#modal-root');

const Modal = ({ children }) => {
  const hasModalOpen = useModalStore((state) => state.hasOpen);
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  return ReactDOM.createPortal(
    <ReactModal isOpen={hasModalOpen} style={customStyles} onRequestClose={() => setHasModalOpen(false)}>
      {children}
    </ReactModal>,
    document.getElementById('modal-root')
  );
};

export default Modal;
