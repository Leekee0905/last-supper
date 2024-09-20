import { IoRestaurantSharp } from 'react-icons/io5';
import { RxDotsVertical } from 'react-icons/rx';
import Pagination from '../../../../components/Pagination';
import { useRef, useState } from 'react';
import {
  useGetMyActivitiesQuery,
  useMyActivityRemoveMutate
} from '../../../../hooks/queries/myActivities/myActivityQuery';
import useUserStore from '../../../../store/useUserStore';

const MyActivities = ({ queryKey, updateMyReviewMutate }) => {
  const mode = queryKey === 'favorites' ? '즐겨찾기' : '내 리뷰';
  const { userId } = useUserStore((state) => state);

  const [page, setPage] = useState(1);
  const { data } = useGetMyActivitiesQuery(queryKey, userId, page);
  const { data: activityLogs, totalPages } = data;

  const [edit, setEdit] = useState(false);
  const [editReview, setEditReview] = useState(false);
  const [editReviewInput, setEditReviewInput] = useState('');
  // const editReviewInputRef = useRef();

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
      <h3>{mode}</h3>
      <ol className="grid justify-items-center grid-cols-2 grid-rows-3 h-full rounded gap-4 p-4 bg-white">
        {!!activityLogs?.length ? (
          activityLogs.map((log) => {
            return (
              <li
                key={log.id}
                className="flex shadow-md flex-row w-full items-center pl-4 rounded justify gap-3 bg-[var(--khaki-color)] break-all"
              >
                <IoRestaurantSharp className="text-2xl w-[24px]" />
                <main className="h-full grow relative">
                  <h4 className="absolute top-4">{log.storeName}</h4>
                  {mode === '즐겨찾기' ? (
                    <>
                      <p className="absolute top-11 overflow-auto h-2/5">주소 : {log.storeAddress}</p>
                      <p className="absolute bottom-1 h-1/5 overflow-auto">
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
                            className="w-4/5 absolute top-12 h-1/2 resize-none rounded"
                            // ref={editReviewInputRef}
                            value={editReviewInput}
                            onChange={(e) => setEditReviewInput(e.target.value)}
                            onKeyDown={(e) => e.code === 'Enter' && !e.shiftKey && handleReviewChange(e, log.id)}
                          />
                          <button className="bg-[var(--dark-khaki-color)] absolute rounded right-0 bottom-7 w-1/6 h-10">
                            확인
                          </button>
                        </form>
                      ) : (
                        <p className="absolute top-12 overflow-auto h-1/2">{log.review}</p>
                      )}
                    </>
                  )}
                </main>
                <div className="flex-col flex justify-start items-center h-full w-10 select-none">
                  <button onClick={() => setEdit((prev) => !prev)} className="pt-4">
                    <RxDotsVertical className="text-xl" />
                  </button>
                  {edit && (
                    <div className="shadow-lg">
                      {mode === '내 리뷰' && (
                        <button
                          onClick={() => {
                            setEditReview((prev) => !prev);
                            setEdit((prev) => !prev);
                            editReview || setEditReviewInput(log.review);
                            //  editReviewInputRef.current.focus());
                          }}
                          className={editStyle}
                        >
                          {editReview ? '취소' : '수정'}
                        </button>
                      )}
                      <button
                        onClick={() => {
                          removeMyActivity(log.id);
                          setEdit((prev) => !prev);
                        }}
                        className={editStyle}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <p className={guideStyle}>등록한 {mode}가 없습니다.</p>
        )}
      </ol>
      <div className="h-6">
        {!!activityLogs?.length && <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />}
      </div>
    </>
  );
};

export default MyActivities;

const guideStyle = 'col-span-full row-span-2 flex items-center text-xl';

const editStyle = 'border w-10 bg-[var(--dark-khaki-color)]';
