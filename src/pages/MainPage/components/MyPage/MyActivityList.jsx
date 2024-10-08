import { useEffect, useRef, useState } from 'react';
import { IoRestaurantSharp } from 'react-icons/io5';
import { RiEditLine, RiCloseLine, RiDeleteBin6Line } from 'react-icons/ri';
import { useAlertStore } from '../../../../store/useAlertStore';
import Swal from 'sweetalert2';
import {
  useMyActivityRemoveMutate,
  useMyActivityUpdateMutate
} from '../../../../hooks/queries/myActivities/myActivityQuery';
import useUserStore from '../../../../store/useUserStore';

const MyActivityList = ({ log, mode, queryKey, page }) => {
  const [editReview, setEditReview] = useState(false);
  const [editReviewInput, setEditReviewInput] = useState('');
  const { userId } = useUserStore((state) => state.user);
  const addAlert = useAlertStore((state) => state.addAlert);

  const { mutate: updateReviewMutate } = useMyActivityUpdateMutate(queryKey, userId, page);
  const { mutate: removeMyactivityMutate } = useMyActivityRemoveMutate(queryKey, userId, page);

  // 리뷰 수정 시 textarea 포커싱
  const editReviewInputRef = useRef();
  useEffect(() => {
    if (editReviewInputRef.current) {
      editReviewInputRef.current.focus();
      editReviewInputRef.current.setSelectionRange(editReviewInput.length, editReviewInput.length);
    }
  }, [editReview]);

  // 리뷰 내용 수정 함수
  const handleReviewChange = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: '리뷰 내용을 수정하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        updateReviewMutate({ id, content: editReviewInput });
        setEditReview(false);
        addAlert('리뷰 내용이 수정되었습니다.', 'success');
      } else {
        addAlert('리뷰 내용이 수정을 취소하였습니다.');
      }
    });
  };

  // 즐겨찾기, 리뷰 삭제 함수
  const removeMyActivity = (logId) => {
    Swal.fire({
      title: `${mode}를 삭제하시겠습니까?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        removeMyactivityMutate(logId);
        addAlert(`${mode}가 삭제되었습니다.`, 'success');
      } else {
        addAlert('삭제를 취소하였습니다.', 'error');
      }
    });
  };

  return (
    <>
      <IoRestaurantSharp className="text-2xl w-[24px]" />
      <main className="h-full grow relative">
        <div className="absolute top-[10%] flex w-full justify-between pr-[1vw]">
          <h4 className="truncate w-4/5">{log.storeName}</h4>
          <div className="flex gap-[1vw] text-xl">
            {mode === '내 리뷰' && (
              <button
                onClick={() => {
                  setEditReview((prev) => !prev);
                  setEditReviewInput(log.review);
                }}
              >
                {editReview ? <RiCloseLine /> : <RiEditLine />}
              </button>
            )}
            <button
              onClick={() => {
                removeMyActivity(log.id);
              }}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
        {mode === '즐겨찾기' ? (
          <>
            <p className="absolute top-12 text-xl overflow-auto h-2/5">주소 : {log.storeAddress}</p>
            <p className="absolute bottom-2 h-1/5 w-full truncate">전화번호 : {log.storePhone}</p>
          </>
        ) : (
          <>
            {editReview ? (
              <form onSubmit={(e) => handleReviewChange(e, log.id)} className="w-full h-full">
                <textarea
                  required
                  rows="1"
                  className="w-[82%] absolute top-12 h-1/2 resize-none rounded"
                  ref={editReviewInputRef}
                  defaultValue={log.review}
                  onChange={(e) => setEditReviewInput(e.target.value)}
                  onKeyDown={(e) => e.code === 'Enter' && !e.shiftKey && handleReviewChange(e, log.id)}
                />
                <button className="bg-[var(--dark-khaki-color)] absolute rounded right-[1vw] w-[12%] h-1/2 top-12">
                  확인
                </button>
              </form>
            ) : (
              <p className="absolute w-[82%] top-12 overflow-auto h-1/2">{log.review}</p>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default MyActivityList;
