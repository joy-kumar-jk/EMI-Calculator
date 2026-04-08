import { memo } from 'react';
import { formatCurrency } from '../../utils/formatters';

const AmortizationRow = memo(function AmortizationRow({ row }) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50">
      <td className="px-4 py-2.5 text-sm text-gray-600">{row.month}</td>
      <td className="px-4 py-2.5 text-sm text-gray-900 font-medium">{formatCurrency(row.emi)}</td>
      <td className="px-4 py-2.5 text-sm text-purple-700">{formatCurrency(row.principal)}</td>
      <td className="px-4 py-2.5 text-sm text-amber-600">{formatCurrency(row.interest)}</td>
      <td className="px-4 py-2.5 text-sm text-gray-900">{formatCurrency(row.balance)}</td>
    </tr>
  );
});

export default AmortizationRow;
