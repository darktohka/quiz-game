import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-preact';
import { useMemo } from 'preact/hooks';

export type PaginationProps = {
  page: number;
  setPage: (_page: (_p: number) => number | number) => void;
  className?: string;
  rowCount: number;
  pageSize: number;
};

export const Pagination = ({
  page,
  setPage,
  className,
  rowCount,
  pageSize,
}: PaginationProps) => {
  const pageCount = Math.ceil(rowCount / pageSize);
  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, i) => i),
    [pageCount]
  );

  if (pageCount <= 1) {
    return <></>;
  }

  const next = () => {
    if (page < pageCount - 1) {
      setPage((p) => p + 1);
    }
  };

  const prev = () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        className="rounded-md cursor-pointer enabled:hover:ring-2 hover:ring-primary p-2 transition duration-250 disabled:cursor-not-allowed"
        onClick={prev}
        disabled={page <= 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {pages.map((index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            disabled={page === index}
            className={`px-3 py-1 rounded-md ${page === index ? 'bg-primary' : ''} hover:ring-2 hover:ring-primary transition duration-250 disabled:cursor-normal`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="rounded-md cursor-pointer enabled:hover:ring-2 hover:ring-primary p-2 transition duration-250 disabled:cursor-not-allowed"
        onClick={next}
        disabled={page >= pageCount - 1}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
};
