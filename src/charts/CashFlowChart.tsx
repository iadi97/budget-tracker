import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { CategoryTotals } from "../hooks/useTotals";

type Props = {
  totals: CategoryTotals;
};

export default function CashFlowChart({ totals }: Props) {
  const data = [
    {
      name: "Income",
      Planned: totals.income.planned,
      Actual: totals.income.actual
    },
    {
      name: "Bills",
      Planned: totals.bills.planned,
      Actual: totals.bills.actual
    },
    {
      name: "Expenses",
      Planned: totals.expenses.planned,
      Actual: totals.expenses.actual
    },
    {
      name: "Savings",
      Planned: totals.savings.planned,
      Actual: totals.savings.actual
    },
    {
      name: "Debt",
      Planned: totals.debt.planned,
      Actual: totals.debt.actual
    }
  ];

  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `$${Number(v).toFixed(2)}`} />
          <Legend />
          <Bar dataKey="Planned" fill="#C4B5FD" />
          <Bar dataKey="Actual" fill="#7C3AED" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
