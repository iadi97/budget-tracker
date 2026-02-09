import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

type Props = {
  expensesActual: number;
  billsActual: number;
  savingsActual: number;
  debtActual: number;
};

export default function AllocationChart({
  expensesActual,
  billsActual,
  savingsActual,
  debtActual
}: Props) {
  const data = [
    { name: "Expenses", value: expensesActual },
    { name: "Bills", value: billsActual },
    { name: "Savings", value: savingsActual },
    { name: "Debt", value: debtActual }
  ].filter((d) => d.value > 0);

  const colors = ["#7C3AED", "#C4B5FD", "#A78BFA", "#DDD6FE"];

  if (data.length === 0) {
    return <div className="text-gray-500">No allocation data yet</div>;
  }

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={70} paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `$${Number(v).toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
