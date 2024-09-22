import Pagination from '../../../../components/Pagination';
import { useState } from 'react';
import {
  useGetMyActivitiesQuery,
  useMyActivityRemoveMutate,
  useMyActivityUpdateMutate
} from '../../../../hooks/queries/myActivities/myActivityQuery';
import useUserStore from '../../../../store/useUserStore';
import MyActivityList from './MyActivityList';

const MyActivities = ({ queryKey }) => {
  const mode = queryKey === 'favorites' ? '즐겨찾기' : '내 리뷰';
  const { userId } = useUserStore((state) => state.user);

  const [page, setPage] = useState(1);
  const { data: activityLogs, totalDatas } = useGetMyActivitiesQuery(queryKey, userId, page).data;
  const totalPages = Math.ceil(totalDatas / 6);

  // 리뷰 수정 뮤테이트
  const { mutate: updateMutate } = useMyActivityUpdateMutate(queryKey, userId, page);

  // 리뷰, 즐겨찾기 삭제 뮤테이트
  const { mutate: removeMutate } = useMyActivityRemoveMutate(queryKey, userId, page);

  return (
    <>
      <h3>{mode}</h3>
      <ol className="grid justify-items-center grid-cols-2 grid-rows-3 h-full rounded gap-4 p-4 bg-white">
        {activityLogs?.length ? (
          activityLogs.map((log) => {
            return (
              <li
                key={log.id}
                className="flex shadow-md flex-row w-full items-center pl-4 rounded justify gap-3 bg-[var(--khaki-color)] break-all relative"
              >
                <MyActivityList
                  log={log}
                  mode={mode}
                  queryKey={queryKey}
                  updateMutate={updateMutate}
                  removeMutate={removeMutate}
                />
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
