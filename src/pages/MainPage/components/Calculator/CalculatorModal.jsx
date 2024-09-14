import useModalStore from '../../../../store/useModalStore';
import CalculatorForm from './CalculatorForm';
import Modal from '../Modal/Modal';

const CalculatorModal = () => {
  const setHasOpenModal = useModalStore((state) => state.setHasOpen)
  return (
    <Modal>
      <CalculatorForm />
      <button onClick={() => setHasOpenModal(false)}>닫기</button>
    </Modal>
  )
}

export default CalculatorModal;