import SliderInput from './SliderInput';
import TenureToggle from './TenureToggle';
import { LOAN_AMOUNT, ANNUAL_RATE, TENURE_MONTHS, TENURE_YEARS } from '../../constants';
import { formatCurrency } from '../../utils/formatters';

export default function LoanInputForm({
  loanAmount, setLoanAmount,
  annualRate, setAnnualRate,
  tenure, setTenure,
  tenureUnit, setTenureUnit,
}) {
  const isYears = tenureUnit === 'years';
  const tenureDisplay = isYears ? Math.round(tenure / 12) : tenure;
  const tenureConfig = isYears ? TENURE_YEARS : TENURE_MONTHS;

  const handleTenureChange = (val) => {
    setTenure(isYears ? val * 12 : val);
  };

  const handleUnitChange = (unit) => {
    setTenureUnit(unit);
    if (unit === 'years') {
      setTenure(Math.max(12, Math.round(tenure / 12) * 12));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Loan Details</h2>

      <SliderInput
        label="Loan Amount"
        value={loanAmount}
        min={LOAN_AMOUNT.min}
        max={LOAN_AMOUNT.max}
        step={LOAN_AMOUNT.step}
        unit=""
        onChange={setLoanAmount}
        formatDisplay={(v) => formatCurrency(v)}
      />

      <SliderInput
        label="Annual Interest Rate"
        value={annualRate}
        min={ANNUAL_RATE.min}
        max={ANNUAL_RATE.max}
        step={ANNUAL_RATE.step}
        unit="%"
        onChange={setAnnualRate}
      />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Loan Tenure</span>
          <TenureToggle value={tenureUnit} onChange={handleUnitChange} />
        </div>
        <SliderInput
          label=""
          value={tenureDisplay}
          min={tenureConfig.min}
          max={tenureConfig.max}
          step={tenureConfig.step}
          unit={isYears ? 'yr' : 'mo'}
          onChange={handleTenureChange}
        />
      </div>
    </div>
  );
}
