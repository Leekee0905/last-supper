import ReactModal from 'react-modal';
import useModalStore from '../../../../store/useModalStore';
import ReactDOM from 'react-dom';

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

ReactModal.setAppElement('#modal-root');

const Modal = ({ children }) => {
  const hasModalOpen = useModalStore((state) => state.hasOpen);
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);
  return ReactDOM.createPortal(
    <ReactModal isOpen={hasModalOpen} style={customStyles}>
      {children}
    </ReactModal>,
    document.getElementById('modal-root')
  );
};

export default Modal;
