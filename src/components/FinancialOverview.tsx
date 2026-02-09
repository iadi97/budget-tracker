type Row = {
  label: string;
  planned: number;
  actual: number;
};

export default function FinancialOverview({ rows }: { rows: Row[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">Category</th>
          <th className="text-right p-2">Planned</th>
          <th className="text-right p-2">Actual</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="border-b">
            <td className="p-2">{r.label}</td>
            <td className="p-2 text-right">${r.planned.toFixed(2)}</td>
            <td className="p-2 text-right">${r.actual.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
