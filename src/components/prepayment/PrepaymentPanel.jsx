import { useState } from 'react';
import PrepaymentForm from './PrepaymentForm';
import PrepaymentImpact from './PrepaymentImpact';
import { formatCurrency } from '../../utils/formatters';

export default function PrepaymentPanel({
  prepayments, addPrepayment, removePrepayment,
  prepaymentMode, setPrepaymentMode,
  prepaymentResult, tenure, totalInterest,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="text-lg font-semibold text-gray-900">Prepayment Simulation</h2>
        <span className="text-gray-400 text-xl">{isOpen ? '-' : '+'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Mode:</span>
            <select
              value={prepaymentMode}
              onChange={(e) => setPrepaymentMode(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="reduce-tenure">Reduce Tenure</option>
              <option value="reduce-emi">Reduce EMI</option>
            </select>
          </div>

          <PrepaymentForm onAdd={addPrepayment} maxMonth={tenure} />

          {prepayments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {prepayments.map((pp) => (
                <span
                  key={pp.id}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {pp.type === 'recurring' ? 'Recurring' : 'One-time'}: {formatCurrency(pp.amount)} @ month {pp.startMonth}
                  {pp.frequency ? ` (every ${pp.frequency}mo)` : ''}
                  <button
                    onClick={() => removePrepayment(pp.id)}
                    className="text-blue-400 hover:text-red-500 font-bold"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}

          <PrepaymentImpact
            original={{ tenure, totalInterest }}
            result={prepaymentResult}
          />
        </div>
      )}
    </div>
  );
}
