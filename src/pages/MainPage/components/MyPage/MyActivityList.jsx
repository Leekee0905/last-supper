import { useEffect, useRef, useState } from 'react';
import { IoRestaurantSharp } from 'react-icons/io5';
import { RxDotsVertical } from 'react-icons/rx';
import {
  useMyActivityRemoveMutate,
  useMyActivityUpdateMutate
} from '../../../../hooks/queries/myActivities/myActivityQuery';
import { REVIEWS_QUERY_KEY } from '../../../../hooks/queries/queryKeys';

const MyActivityList = ({ log, mode, queryKey }) => {
  const [editMenu, setEditMenu] = useState(false);
  const [editReview, setEditReview] = useState(false);
  const [editReviewInput, setEditReviewInput] = useState('');

  // 리뷰 수정 시 textarea 포커싱
  const editReviewInputRef = useRef();
  useEffect(() => {
    if (editReviewInputRef.current) {
      editReviewInputRef.current.focus();
      editReviewInputRef.current.setSelectionRange(editReviewInput.length, editReviewInput.length);
    }
  }, [editMenu]);

  // 리뷰 수정 뮤테이트
  const { mutate: updateMyReviewMutate } = useMyActivityUpdateMutate(REVIEWS_QUERY_KEY);

  // 리뷰 내용 수정 함수
  const handleReviewChange = (e, id) => {
    e.preventDefault();
    if (confirm('리뷰 내용을 수정하시겠습니까?')) {
      updateMyReviewMutate({ id, content: editReviewInput });
      setEditReview(false);
      alert('리뷰 내용이 수정되었습니다.');
    } else {
      alert('리뷰 내용이 수정을 취소하였습니다.');
    }
  };

  // 즐겨찾기 및 리뷰 삭제 함수
  const { mutate: removeMyActivityMutate } = useMyActivityRemoveMutate(queryKey);

  const removeMyActivity = (logId) => {
    if (confirm(`${mode}를 삭제하시겠습니까?`)) {
      removeMyActivityMutate(logId);
      alert(`${mode}가 삭제되었습니다.`);
    } else {
      alert('삭제를 취소하였습니다.');
    }
  };

  return (
    <>
      <IoRestaurantSharp className="text-2xl w-[24px]" />
      <main className="h-full grow relative">
        <h4 className="absolute top-4 truncate h-1/5 w-full">{log.storeName}</h4>
        {mode === '즐겨찾기' ? (
          <>
            <p className="absolute top-11 overflow-auto h-2/5">주소 : {log.storeAddress}</p>
            <p className="absolute bottom-1 h-1/5 w-full truncate">
              <small>전화번호 : {log.storePhone}</small>
            </p>
          </>
        ) : (
          <>
            {editReview ? (
              <form onSubmit={(e) => handleReviewChange(e, log.id)} className="w-full h-full">
                <textarea
                  required
                  rows="1"
                  className="w-full absolute top-12 h-1/2 resize-none rounded"
                  ref={editReviewInputRef}
                  value={editReviewInput}
                  onChange={(e) => setEditReviewInput(e.target.value)}
                  onKeyDown={(e) => e.code === 'Enter' && !e.shiftKey && handleReviewChange(e, log.id)}
                />
                <button className="bg-[var(--dark-khaki-color)] absolute rounded -right-[46px] w-[42px] h-1/2 top-12">
                  확인
                </button>
              </form>
            ) : (
              <p className="absolute top-12 overflow-auto h-1/2">{log.review}</p>
            )}
          </>
        )}
      </main>
      <div className="flex-col flex justify-start items-center h-full w-10 select-none z-10">
        <button onClick={() => setEditMenu((prev) => !prev)} className="pt-4">
          <RxDotsVertical className="text-xl" />
        </button>
        {editMenu && (
          <div className="shadow-lg">
            {mode === '내 리뷰' && (
              <button
                onClick={() => {
                  setEditReview((prev) => !prev);
                  setEditMenu((prev) => !prev);
                  editReview || setEditReviewInput(log.review);
                }}
                className={editStyle}
              >
                {editReview ? '취소' : '수정'}
              </button>
            )}
            <button
              onClick={() => {
                removeMyActivity(log.id);
                setEditMenu((prev) => !prev);
              }}
              className={editStyle}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyActivityList;

const editStyle = 'border w-10 bg-[var(--dark-khaki-color)]';