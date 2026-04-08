import { useState, useMemo } from 'react';
import { calculateEMI, buildAmortizationSchedule, buildYearlyAggregates, simulatePrepayments } from '../utils/emiCalculator';
import { LOAN_AMOUNT, ANNUAL_RATE, TENURE_MONTHS } from '../constants';

export function useEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(LOAN_AMOUNT.default);
  const [annualRate, setAnnualRate] = useState(ANNUAL_RATE.default);
  const [tenure, setTenure] = useState(TENURE_MONTHS.default);
  const [tenureUnit, setTenureUnit] = useState('months');
  const [prepayments, setPrepayments] = useState([]);
  const [prepaymentMode, setPrepaymentMode] = useState('reduce-tenure');
  const [selectedBank, setSelectedBank] = useState(null);

  const emi = useMemo(
    () => calculateEMI(loanAmount, annualRate, tenure),
    [loanAmount, annualRate, tenure]
  );

  const summary = useMemo(() => {
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loanAmount;
    return { totalPayment, totalInterest };
  }, [emi, tenure, loanAmount]);

  const schedule = useMemo(
    () => buildAmortizationSchedule(loanAmount, annualRate, tenure),
    [loanAmount, annualRate, tenure]
  );

  const yearlyData = useMemo(
    () => buildYearlyAggregates(schedule),
    [schedule]
  );

  const prepaymentResult = useMemo(
    () => simulatePrepayments(loanAmount, annualRate, tenure, prepayments, prepaymentMode),
    [loanAmount, annualRate, tenure, prepayments, prepaymentMode]
  );

  const addPrepayment = (pp) => {
    setPrepayments((prev) => [...prev, { ...pp, id: Date.now() }]);
  };

  const removePrepayment = (id) => {
    setPrepayments((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    loanAmount, setLoanAmount,
    annualRate, setAnnualRate,
    tenure, setTenure,
    tenureUnit, setTenureUnit,
    selectedBank, setSelectedBank,
    prepayments, prepaymentMode, setPrepaymentMode,
    addPrepayment, removePrepayment,
    emi, summary, schedule, yearlyData, prepaymentResult,
  };
}
