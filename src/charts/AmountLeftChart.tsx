import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

type Props = {
  incomeActual: number;
  outflowActual: number;
};

export default function AmountLeftChart({ incomeActual, outflowActual }: Props) {
  const left = incomeActual - outflowActual;

  const leftClamped = left < 0 ? 0 : left;
  const spentClamped = outflowActual < 0 ? 0 : outflowActual;

  const data = [
    { name: "Left", value: leftClamped },
    { name: "Used", value: spentClamped }
  ];

  return (
    <div className="h-44">
      <div className="text-center mb-2">
        <div className="text-sm text-gray-500">Amount Left</div>
        <div className="text-xl font-semibold">${left.toFixed(2)}</div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
          >
            <Cell fill="#C4B5FD" />
            <Cell fill="#E5E7EB" />
          </Pie>
          <Tooltip formatter={(v: number) => `$${Number(v).toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
