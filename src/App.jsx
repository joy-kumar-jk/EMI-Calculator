import { useEmiCalculator } from './hooks/useEmiCalculator';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoanInputForm from './components/inputs/LoanInputForm';
import EmiSummaryCard from './components/summary/EmiSummaryCard';
import BreakdownPieChart from './components/charts/BreakdownPieChart';
import YearlyBarChart from './components/charts/YearlyBarChart';
import AmortizationTable from './components/amortization/AmortizationTable';
import PrepaymentPanel from './components/prepayment/PrepaymentPanel';

function App() {
  const {
    loanAmount, setLoanAmount,
    annualRate, setAnnualRate,
    tenure, setTenure,
    tenureUnit, setTenureUnit,
    selectedBank, setSelectedBank,
    prepayments, prepaymentMode, setPrepaymentMode,
    addPrepayment, removePrepayment,
    emi, summary, schedule, yearlyData, prepaymentResult,
  } = useEmiCalculator();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoanInputForm
            loanAmount={loanAmount} setLoanAmount={setLoanAmount}
            annualRate={annualRate} setAnnualRate={setAnnualRate}
            tenure={tenure} setTenure={setTenure}
            tenureUnit={tenureUnit} setTenureUnit={setTenureUnit}
            selectedBank={selectedBank} setSelectedBank={setSelectedBank}
          />
          <EmiSummaryCard
            emi={emi}
            totalInterest={summary.totalInterest}
            totalPayment={summary.totalPayment}
            loanAmount={loanAmount}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BreakdownPieChart principal={loanAmount} totalInterest={summary.totalInterest} />
          <YearlyBarChart yearlyData={yearlyData} />
        </div>

        <PrepaymentPanel
          prepayments={prepayments}
          addPrepayment={addPrepayment}
          removePrepayment={removePrepayment}
          prepaymentMode={prepaymentMode}
          setPrepaymentMode={setPrepaymentMode}
          prepaymentResult={prepaymentResult}
          tenure={tenure}
          totalInterest={summary.totalInterest}
        />

        <AmortizationTable schedule={schedule} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
