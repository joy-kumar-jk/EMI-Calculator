import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export default function YearlyBarChart({ yearlyData }) {
  if (!yearlyData.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Yearly Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yearlyData} barGap={0}>
          <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} />
          <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={50} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="principal" name="Principal" fill="#7c3aed" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="interest" name="Interest" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
