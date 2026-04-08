export function calculateEMI(principal, annualRate, tenureMonths) {
  if (annualRate === 0) return principal / tenureMonths;
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  const pow = Math.pow(1 + r, n);
  return (principal * r * pow) / (pow - 1);
}

export function buildAmortizationSchedule(principal, annualRate, tenureMonths) {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const r = annualRate / 12 / 100;
  const schedule = [];
  let balance = principal;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * r;
    const principalPaid = Math.min(emi - interest, balance);
    balance = Math.max(balance - principalPaid, 0);
    cumulativePrincipal += principalPaid;
    cumulativeInterest += interest;

    schedule.push({
      month,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
      cumulativePrincipal: Math.round(cumulativePrincipal * 100) / 100,
      cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
    });
  }

  return schedule;
}

export function buildYearlyAggregates(schedule) {
  const yearly = [];
  for (let i = 0; i < schedule.length; i += 12) {
    const chunk = schedule.slice(i, i + 12);
    yearly.push({
      year: Math.floor(i / 12) + 1,
      principal: Math.round(chunk.reduce((s, r) => s + r.principal, 0)),
      interest: Math.round(chunk.reduce((s, r) => s + r.interest, 0)),
    });
  }
  return yearly;
}

export function simulatePrepayments(principal, annualRate, tenureMonths, prepayments, mode = 'reduce-tenure') {
  if (!prepayments.length) return null;

  const originalEMI = calculateEMI(principal, annualRate, tenureMonths);
  const originalTotalInterest = originalEMI * tenureMonths - principal;

  const r = annualRate / 12 / 100;
  let balance = principal;
  let emi = originalEMI;
  let totalInterestPaid = 0;
  const schedule = [];
  let month = 0;

  while (balance > 0.01 && month < tenureMonths * 2) {
    month++;
    const interest = balance * r;
    const principalPaid = Math.min(emi - interest, balance);
    balance = Math.max(balance - principalPaid, 0);
    totalInterestPaid += interest;

    // Apply prepayments
    let extraPayment = 0;
    for (const pp of prepayments) {
      if (pp.type === 'one-time' && pp.startMonth === month) {
        extraPayment += pp.amount;
      } else if (pp.type === 'recurring' && month >= pp.startMonth && (month - pp.startMonth) % (pp.frequency || 1) === 0) {
        extraPayment += pp.amount;
      }
    }

    if (extraPayment > 0) {
      extraPayment = Math.min(extraPayment, balance);
      balance = Math.max(balance - extraPayment, 0);

      if (mode === 'reduce-emi' && balance > 0) {
        const remainingMonths = tenureMonths - month;
        if (remainingMonths > 0) {
          emi = calculateEMI(balance, annualRate, remainingMonths);
        }
      }
    }

    schedule.push({
      month,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      extraPayment: Math.round(extraPayment * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });

    if (balance <= 0.01) break;
  }

  return {
    schedule,
    actualTenure: month,
    totalInterestPaid: Math.round(totalInterestPaid),
    interestSaved: Math.round(originalTotalInterest - totalInterestPaid),
    tenureSaved: tenureMonths - month,
    newEMI: Math.round(emi),
  };
}
