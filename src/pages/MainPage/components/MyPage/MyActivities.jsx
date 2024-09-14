import { IoRestaurantSharp, IoHeartDislike } from 'react-icons/io5';
import Pagination from '../../../../components/Pagination';
import { useState } from 'react';

const MyActivities = ({ getData, removeFavorite }) => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = getData('user123');

  const onClickPage = (selected) => {
    if (page === selected) return;

    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }

    if (selected === 'prev' && page > 1) {
      setPage((prev) => prev - 1);
      return;
    }

    if (selected === 'next' && page < data.total_pages) {
      setPage((prev) => prev + 1);
      return;
    }
  };

  if (isPending) {
    return <p>로딩중...</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return (
    <>
      <h3>{!!removeFavorite ? '즐겨찾기' : '내 리뷰'}</h3>
      <ul className="grid justify-items-center grid-cols-2 grid-rows-3 h-full bg-[var(--brown-color)] rounded gap-4 p-4">
        {!!data.length ? (
          data.map((log) => {
            return (
              <li
                key={log.storeId}
                className="flex flex-row w-full items-center px-4 border rounded justify bg-[var(--sand-color)] gap-3 cursor-pointer text-[var(--green-color)]"
              >
                <IoRestaurantSharp className="text-2xl w-[10%]" />
                <main className="grow">
                  <h4>{log.storeName}</h4>
                  <p>주소 : {log.storeAddress}</p>
                  <p>
                    <small>전화번호 : {log.storeCall}</small>
                  </p>
                </main>
                {!!removeFavorite && (
                  <button onClick={() => removeFavorite(log.id)}>
                    <IoHeartDislike className="text-2xl hover:text-[var(--brown-color)]" />
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <p className="col-span-full row-span-2 flex items-center text-xl">
            등록한 {!!removeFavorite ? '즐겨찾기' : '리뷰'}가 없습니다.
          </p>
        )}
      </ul>
      <Pagination currentPage={page} totalPages={data?.total_pages ?? 1} onClick={onClickPage} />
    </>
  );
};

export default MyActivities;
