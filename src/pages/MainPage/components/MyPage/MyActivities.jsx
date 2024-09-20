import { IoRestaurantSharp, IoHeartDislike } from 'react-icons/io5';
import Pagination from '../../../../components/Pagination';
import { useState } from 'react';
import { useGetMyActivitiesQuery } from '../../../../hooks/queries/myActivities/myActivityQuery';
import useUserStore from '../../../../store/useUserStore';

const MyActivities = ({ queryKey, removeFavorite }) => {
  const { userId } = useUserStore((state) => state);

  const [page, setPage] = useState(1);
  const { data } = useGetMyActivitiesQuery(queryKey, userId, page);
  const { data: activityLogs, totalPages } = data;

  return (
    <>
      <h3>{!!removeFavorite ? '즐겨찾기' : '내 리뷰'}</h3>
      <ol className="grid justify-items-center grid-cols-2 grid-rows-3 h-full rounded gap-4 p-4">
        {!!activityLogs?.length ? (
          activityLogs.map((log) => {
            return (
              <li key={log.id} className="flex flex-row w-full items-center px-4 border rounded justify gap-3">
                <IoRestaurantSharp className="text-2xl w-[24px]" />
                <main className="grow">
                  <h4>{log.storeName}</h4>
                  <p>주소 : {log.storeAddress}</p>
                  <p>
                    <small>전화번호 : {log.storePhone}</small>
                  </p>
                </main>
                {/* {!!removeFavorite && (
                  <button onClick={() => removeFavorite(log.id)}>
                    <IoHeartDislike className="text-2xl hover:text-[var(--sand-color)]" />
                  </button>
                )} */}
              </li>
            );
          })
        ) : (
          <p className={guideStyle}>등록한 {!!removeFavorite ? '즐겨찾기' : '리뷰'}가 없습니다.</p>
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
