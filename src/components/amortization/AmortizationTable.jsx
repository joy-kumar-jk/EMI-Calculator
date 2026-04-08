import { useState } from 'react';
import AmortizationRow from './AmortizationRow';
import { ROWS_PER_PAGE } from '../../constants';

export default function AmortizationTable({ schedule }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(schedule.length / ROWS_PER_PAGE);
  const start = page * ROWS_PER_PAGE;
  const pageRows = schedule.slice(start, start + ROWS_PER_PAGE);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Amortization Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Month</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">EMI</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Principal</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Interest</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Balance</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <AmortizationRow key={row.month} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Year {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
