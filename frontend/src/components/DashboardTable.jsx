import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const DashboardTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id', Cell: ({ value }) => `R${value.toString().padStart(3, '0')}` },
      { Header: 'Request ID', accessor: 'request_id' },
      { Header: 'Request Type', accessor: 'request_type' },
      { Header: 'Request Time', accessor: 'request_time' },
      { Header: 'Payload', accessor: 'payload' },
      { Header: 'Content Type', accessor: 'content_type' },
      { Header: 'IP Address', accessor: 'ip_address' },
      { Header: 'OS', accessor: 'os' },
      { Header: 'Platform', accessor: 'platform' },
      { Header: 'User Agent', accessor: 'user_agent' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border border-gray-300 px-4 py-2"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-black">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()} className="border border-gray-500 px-4 py-2">{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination my-4 justify-center flex ">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="mr-2 px-4 py-2 bg-gray-200 border border-gray-400 rounded text-black">
          Previous
        </button>
        <span className="px-4 py-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-2 px-4 py-2 bg-gray-200 border border-gray-400 rounded text-black">
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardTable;
