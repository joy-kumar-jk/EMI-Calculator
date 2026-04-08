import { BANK_RATES } from '../../constants/bankRates';

export default function BankSelector({ selectedBank, onSelect }) {
  const handleChange = (e) => {
    const bankId = e.target.value;
    if (!bankId) {
      onSelect(null);
      return;
    }
    const bank = BANK_RATES.find((b) => b.id === bankId);
    if (bank) onSelect(bank);
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Bank</label>
      <select
        value={selectedBank?.id || ''}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      >
        <option value="">Select a Bank (Optional)</option>
        {BANK_RATES.map((bank) => (
          <option key={bank.id} value={bank.id}>
            {bank.name} — {bank.rate.toFixed(2)}% p.a.
          </option>
        ))}
      </select>
    </div>
  );
}
