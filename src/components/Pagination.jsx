const Pagination = ({ currentPage, totalPages, setPage }) => {
  const onClickPage = (selected) => {
    if (currentPage === selected) return;
    if (typeof selected === 'number') {
      setPage(selected);
      return;
    }
    if (selected === 'prev' && currentPage > 1) {
      setPage((prev) => prev - 1);
      return;
    }
    if (selected === 'next' && currentPage < totalPages) {
      setPage((prev) => prev + 1);
      return;
    }
  };

  return (
    <div className="flex justify-center">
      <span className="page-click" onClick={() => onClickPage('prev')}>
        {'<'}
      </span>
      {Array.from({ length: totalPages }, (_, idx) => {
        return (
          <span
            className={`page-click ${currentPage === idx + 1 && 'active-page'}`}
            key={idx}
            onClick={() => onClickPage(idx + 1)}
          >
            {idx + 1}
          </span>
        );
      })}
      <span className="page-click" onClick={() => onClickPage('next')}>
        {'>'}
      </span>
    </div>
  );
};

export default Pagination;
