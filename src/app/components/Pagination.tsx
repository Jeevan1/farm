'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* First page with ellipsis */}
      {!visiblePages.includes(1) && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`rounded-md border px-3 py-1 ${
              currentPage === 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`rounded-md border px-3 py-1 ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page with ellipsis */}
      {!visiblePages.includes(totalPages) && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`rounded-md border px-3 py-1 ${
              currentPage === totalPages
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
