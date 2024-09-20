import Modal from '../pages/MainPage/components/Modal/Modal';

const LoadingModal = () => {
  return (
    <Modal contentStyle={suspenseContent} isLoading={true}>
      <div className="loading-container flex items-center justify-center w-full h-full text-2xl pt-[5vh] pr-[3vw]">
        <div className="loading"></div>
        <div id="loading-text">loading</div>
      </div>
    </Modal>
  );
};

export default LoadingModal;

const suspenseContent = {
  minWidth: '0',
  minHeight: '0',
  width: '30%',
  height: '30%',
  // backgroundColor: 'var(--khaki-color)',
};
