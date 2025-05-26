import { useEffect, useMemo, useState } from 'preact/hooks';
import { EmptyList } from '../EmptyList';
import { Pagination } from './Pagination';
import type { JSX } from 'preact/jsx-runtime';

export type TableColumnProps<T> = {
  title: string;
  minWidth?: string;
  render: (_value: T) => JSX.Element;
  renderValue: (_value: T) => string;
};

export type TableProps<T> = {
  columns: TableColumnProps<T>[];
  rows?: T[];
  pageSize?: number;
};

export const Table = <T,>({ columns, rows, pageSize }: TableProps<T>) => {
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredRows = useMemo(
    () =>
      rows
        ? searchValue
          ? rows.filter((row) => {
              const values = columns.map((column) => column.renderValue(row));
              return values.some((value) =>
                value.toLowerCase().includes(lowerCaseSearchValue)
              );
            })
          : rows
        : [],
    [searchValue, rows]
  );

  pageSize = pageSize || 10;

  useEffect(() => {
    const totalPages = Math.ceil(filteredRows.length / pageSize);

    // If there are too many pages, reset the page to zero
    if (page > totalPages) {
      setPage(0);
    }
  }, [filteredRows, page]);

  if (!rows || rows.length === 0) {
    return <EmptyList />;
  }

  const paginatedRows = filteredRows.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return (
    <div className="px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <input
          type="text"
          placeholder="Keresés..."
          className="mb-[0.5rem] w-full rounded-lg border-[1.5px] py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter border-form-strokedark bg-forminput focus:border-primary"
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left italic dark:bg-meta-4">
              {columns.map((column, i) => (
                <th
                  key={`th-${i}`}
                  style={column.minWidth ? { minWidth: column.minWidth } : {}}
                  className={`py-4 px-4 font-medium text-black dark:text-white${i === 0 ? ' xl:pl-11' : ''}`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          {paginatedRows.map((row, i) => (
            <tr key={`tr-${i}`}>
              {columns.map((column, j) => (
                <td
                  key={`td-${i}-${j}`}
                  className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark${j === 0 ? ' xl:pl-11' : ''}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      <div className="flex justify-center">
        <Pagination
          className="py-[1rem]"
          page={page}
          setPage={setPage}
          rowCount={filteredRows.length}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};
