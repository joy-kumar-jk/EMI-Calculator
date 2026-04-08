import SummaryStatBox from './SummaryStatBox';
import { formatCurrency } from '../../utils/formatters';

export default function EmiSummaryCard({ emi, totalInterest, totalPayment, loanAmount }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">EMI Summary</h2>
      <div className="grid grid-cols-1 gap-3">
        <SummaryStatBox label="Monthly EMI" value={formatCurrency(Math.round(emi))} highlight />
        <div className="grid grid-cols-2 gap-3">
          <SummaryStatBox label="Principal" value={formatCurrency(loanAmount)} />
          <SummaryStatBox label="Total Interest" value={formatCurrency(Math.round(totalInterest))} />
        </div>
        <SummaryStatBox label="Total Amount Payable" value={formatCurrency(Math.round(totalPayment))} />
      </div>
    </div>
  );
}
