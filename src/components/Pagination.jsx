const Pagination = ({ currentPage, totalPages, onClick }) => {
  return (
    <div className="flex justify-center">
      <span className="page-click" onClick={() => onClick('prev')}>
        {'<'}
      </span>
      {Array.from({ length: totalPages }, (_, idx) => {
        if (idx < 5) {
          return (
            <span
              className={`page-click ${currentPage === idx + 1 && 'active-page'}`}
              key={idx}
              onClick={() => onClick(idx + 1)}
            >
              {idx + 1}
            </span>
          );
        } else if (idx >= 5 && idx + 1 === totalPages) {
          return (
            <span key={idx}>
              <span className="mx-[5px]">...</span>
              <span
                className={`page-click ${currentPage === idx + 1 && 'active-page'}`}
                onClick={() => onClick(totalPages)}
              >
                {totalPages}
              </span>
            </span>
          );
        }
      })}
      <span className="page-click" onClick={() => onClick('next')}>
        {'>'}
      </span>
    </div>
  );
};

export default Pagination;
