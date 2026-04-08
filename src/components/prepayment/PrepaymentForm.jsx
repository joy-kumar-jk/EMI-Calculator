import { useState } from 'react';

export default function PrepaymentForm({ onAdd, maxMonth }) {
  const [type, setType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [frequency, setFrequency] = useState(12);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    const month = parseInt(startMonth);
    if (!amt || amt <= 0 || !month || month < 1 || month > maxMonth) return;

    onAdd({
      type,
      amount: amt,
      startMonth: month,
      ...(type === 'recurring' ? { frequency } : {}),
    });
    setAmount('');
    setStartMonth('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="one-time">One-time</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 50000"
            min="1"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">At Month</label>
          <input
            type="number"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            placeholder="e.g. 6"
            min="1"
            max={maxMonth}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {type === 'recurring' && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Every N months</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
      >
        Add Prepayment
      </button>
    </form>
  );
}
