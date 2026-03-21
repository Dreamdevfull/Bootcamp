interface PaginationProps {
  totalItems: number
  pageSize: number
  onPageSizeChange: (size: number) => void
  currentPage: number
  onPageChange: (page: number) => void
}

export function PaginationCrad({ totalItems, pageSize, onPageSizeChange, currentPage, onPageChange }: PaginationProps) {

  const pageCount = Math.ceil(totalItems / pageSize)

  const goToPage = (page: number) => onPageChange(page)

  const getPageNumbers = () => {
    if (pageCount <= 10) return Array.from({ length: pageCount }, (_, i) => i)
    if (currentPage <= 2) return [0, 1, 2, "...", pageCount - 1]
    if (currentPage >= pageCount - 3) return [0, "...", pageCount - 3, pageCount - 2, pageCount - 1]
    return [0, "...", currentPage - 1, currentPage, currentPage + 1, "...", pageCount - 1]
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          หน้า {currentPage + 1} / {pageCount} ({totalItems} รายการ)
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-sm border rounded px-2 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>{size} / หน้า</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className={`px-2 py-1 rounded border text-sm transition-colors ${
            currentPage !== 0 ? "text-gray-700 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300" : "text-gray-300 cursor-not-allowed dark:text-gray-600 dark:border-gray-700"
          }`}
        >{"<"}</button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="px-2 py-1 text-sm text-gray-400 dark:text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(Number(page))}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === page ? "bg-[#1a6b5a] text-white dark:bg-emerald-800 border-emerald-700 dark:border-emerald-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {Number(page) + 1}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
          className={`px-2 py-1 rounded border text-sm transition-colors ${
            currentPage !== pageCount - 1 ? "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-300 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed"
          }`}
        >{">"}</button>
      </div>
    </div>
  )
}