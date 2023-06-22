import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import React from 'react'

export default function Pagination({limit, total, page , setPage}: {limit: number, total: number, page: number, setPage: any}) {
  const [maxPage, setMaxPage] = React.useState<number>(0);
  const [minPage, setMinPage] = React.useState<number>(1);
  React.useEffect(() => {
    if (total > 0) {
      setMaxPage(Math.ceil(total / limit));
    }
  }, [limit, total])

  const pageActive = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-indigo-600 text-white z-10 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
  const pageInactive = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 '

  return (
    <div className="flex items-center justify-between border-gray-200 px-4 py-3 sm:px-0">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page === minPage} onClick={() => setPage(page - 1)}
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${page === minPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
        >
          Previous
        </button>
        <button
          disabled={page === maxPage} onClick={() => setPage(page + 1)}
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${page === maxPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex flex-col md:flex-row sm:flex-1 sm:items-center sm:justify-between">
        <div className='mb-5 md:mb-0'>
          <p className="text-sm text-gray-900">
            Mostrando <span className="font-bold">{total === 0 ? 0 : page * limit - limit + 1}</span> a <span className="font-bold">{page * limit > total ? total : page * limit}</span> de{' '}
            <span className="font-bold">{total}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              disabled={page === minPage} onClick={() => setPage(1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${page === minPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              disabled={page === minPage} onClick={() => setPage(page - 1)}
              className={`relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${page === minPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {total > 0 && (
              <>
                <button disabled={page === minPage} onClick={() => setPage(page - 1)} aria-current="page" className={page === minPage ? pageActive + 'cursor-not-allowed' : pageInactive}>{page >= maxPage - 3 ? maxPage - 5 : page === minPage ? page : page - 1}</button>
                <button disabled={page > minPage && page < maxPage - 3} onClick={() => setPage(page >= maxPage - 3 ? maxPage - 4 : page === minPage ? page + 1 : page)} className={page > minPage && page <= maxPage - 4 ? pageActive + 'cursor-not-allowed' : pageInactive}>{page >= maxPage - 3 ? maxPage - 4 : page === minPage ? page + 1 : page}</button>
                <button disabled={page === maxPage - 3} onClick={() => setPage(page >= maxPage - 2 ? maxPage - 3 : page + 1)} className={page === maxPage - 3 ? pageActive + 'cursor-not-allowed' : pageInactive}>{page >= maxPage - 3 ? maxPage - 3 : page === minPage ? page + 2 : page + 1}</button>
              </>
            )}
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
            {total > 0 && (
              <>
                <button disabled={page === maxPage - 2} onClick={() => setPage(maxPage - 2)} className={page === maxPage - 2 ? pageActive + 'cursor-not-allowed' : pageInactive}>{maxPage - 2}</button>
                <button disabled={page === maxPage - 1} onClick={() => setPage(maxPage - 1)} className={page === maxPage - 1 ? pageActive + 'cursor-not-allowed' : pageInactive}>{maxPage - 1}</button>
                <button disabled={page === maxPage} onClick={() => setPage(maxPage)} className={page === maxPage ? pageActive + 'cursor-not-allowed' : pageInactive}>{maxPage}</button>
              </>
            )}
            <button
              disabled={page === maxPage} onClick={() => setPage(page + 1)}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${page === maxPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              disabled={page === maxPage} onClick={() => setPage(maxPage)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${page === maxPage ? 'cursor-not-allowed' : 'hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
