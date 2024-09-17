import Modal from '../pages/MainPage/components/Modal/Modal';

const LoadingModal = () => {
  return (
    <Modal contentStyle={suspenseContent} overlayStyle={suspenseOverlay} isLoading={true}>
      <div className="flex items-center justify-center w-[50vw] h-[50vh] text-2xl">로딩중 입니다....</div>
    </Modal>
  );
};

export default LoadingModal;

const suspenseContent = { minWidth: '0', minHeight: '0', width: '50%', height: '50%' };

const suspenseOverlay = {
  backgroundColor: 'gray'
};
