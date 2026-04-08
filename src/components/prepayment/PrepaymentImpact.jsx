import { formatCurrency, formatMonths } from '../../utils/formatters';

export default function PrepaymentImpact({ original, result }) {
  if (!result) return null;

  const items = [
    { label: 'Tenure', before: formatMonths(original.tenure), after: formatMonths(result.actualTenure) },
    { label: 'Total Interest', before: formatCurrency(Math.round(original.totalInterest)), after: formatCurrency(result.totalInterestPaid) },
  ];

  return (
    <div className="mt-4 space-y-3">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="text-xs font-medium text-gray-400 uppercase"></div>
        <div className="text-xs font-medium text-gray-400 uppercase">Original</div>
        <div className="text-xs font-medium text-gray-400 uppercase">After Prepayment</div>
      </div>
      {items.map(({ label, before, after }) => (
        <div key={label} className="grid grid-cols-3 gap-3 text-center items-center">
          <div className="text-sm font-medium text-gray-600 text-left">{label}</div>
          <div className="text-sm text-gray-500">{before}</div>
          <div className="text-sm font-semibold text-green-600">{after}</div>
        </div>
      ))}
      <div className="flex gap-4 pt-3 border-t border-gray-100">
        <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
          <p className="text-xs text-green-600 font-medium">Interest Saved</p>
          <p className="text-lg font-bold text-green-700">{formatCurrency(result.interestSaved)}</p>
        </div>
        <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
          <p className="text-xs text-green-600 font-medium">Tenure Saved</p>
          <p className="text-lg font-bold text-green-700">{formatMonths(result.tenureSaved)}</p>
        </div>
      </div>
    </div>
  );
}
