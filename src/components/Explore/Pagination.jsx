import React, { useMemo } from 'react';
import { useNumberingSystem } from '../../utils/numbering-system';

function Pagination({ currentPage, pageLength, setCurrentPage }) {
  const { formatInteger } = useNumberingSystem();
  const pageNumberArray = useMemo(() => {
    if (currentPage > pageLength || pageLength < 0 || currentPage < 0)
      return [];
    const fullArray = Array.from(
      { length: pageLength },
      (_, index) => index + 1
    );
    let returnedArray = [];

    if (fullArray.length <= 6) {
      return fullArray;
    }

    if (currentPage < 4) {
      returnedArray = [1, 2, 3, 4, 5, '...', fullArray.length];
    } else if (currentPage >= 3 && currentPage < fullArray.length - 2) {
      returnedArray = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        fullArray.length,
      ];
    } else if (currentPage >= fullArray.length - 4) {
      returnedArray = [
        1,
        '...',
        fullArray.length - 4,
        fullArray.length - 3,
        fullArray.length - 2,
        fullArray.length - 1,
        fullArray.length,
      ];
    } else {
      return [];
    }
    return returnedArray;
  }, [pageLength, currentPage]);

  return (
    <div className="space-x-3">
      <button
        type="button"
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        className={`min-h-[24px] min-w-[24px] px-1 ${
          currentPage === 1 && 'hidden'
        }`}
      >
        {'<'}
      </button>
      {pageNumberArray.map((v) => {
        if (v === '...') return <span className="">{v}</span>;
        return (
          <button
            type="button"
            onClick={() => setCurrentPage(v)}
            className={`wv-ibmplexlooped rounded-full font-semibold min-h-[24px] min-w-[24px] px-1 ${
              v === currentPage && 'bg-blue text-white'
            }`}
          >
            {formatInteger(v)}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() =>
          setCurrentPage((prev) => (prev < pageLength ? prev + 1 : prev))
        }
        className={`min-h-[24px] min-w-[24px] px-1 ${
          currentPage === pageLength && 'hidden'
        }`}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
