import ReactModal from 'react-modal';
import useModalStore from '../../../../store/useModalStore';
import { FiX } from 'react-icons/fi';

ReactModal.setAppElement('#root');

const Modal = ({ children, contentStyle, overlayStyle, isLoading }) => {
  const hasModalOpen = useModalStore((state) => state.hasOpen);
  const setHasModalOpen = useModalStore((state) => state.setHasOpen);

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
      backgroundColor: 'white',
      ...contentStyle
    },
    overlay: {
      zIndex:'50',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      ...overlayStyle
    }
  };

  return (
    <ReactModal isOpen={hasModalOpen} style={customStyles}>
      {isLoading || (
        <div className="flex justify-end h-[5vh] pt-[1vh] pr-[1vw]">
          <button onClick={()=>setHasModalOpen(false)}>
            <FiX className="text-3xl hover:text-[var(--black-color)] active:opacity-50" />
          </button>
        </div>
      )}
      {children}
    </ReactModal>
  );
};

export default Modal;
