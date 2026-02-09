import { useDebt } from "../hooks/useDebt";

type Props = { monthId?: string };

export default function DebtTable({ monthId }: Props) {
  const { rows, loading, addRow, updateRow, deleteRow } = useDebt(monthId);

  if (!monthId) return <p>Select a month</p>;
  if (loading) return <p>Loading debt...</p>;

  return (
    <div>
      <table className="w-full border-collapse mb-3">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Debt</th>
            <th className="text-right p-2">Planned</th>
            <th className="text-right p-2">Actual</th>
            <th className="text-right p-2">Progress</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const progress =
              r.planned_amount > 0
                ? Math.round((r.actual_amount / r.planned_amount) * 100)
                : 0;

            return (
              <tr key={r.id} className="border-b">
                <td className="p-2">
                  <input
                    className="w-full border p-1"
                    value={r.debt_name}
                    onChange={(e) => updateRow(r.id, "debt_name", e.target.value)}
                  />
                </td>
                <td className="p-2 text-right">
                  <input
                    type="number"
                    className="w-24 border p-1 text-right"
                    value={r.planned_amount}
                    onChange={(e) =>
                      updateRow(r.id, "planned_amount", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2 text-right">
                  <input
                    type="number"
                    className="w-24 border p-1 text-right"
                    value={r.actual_amount}
                    onChange={(e) =>
                      updateRow(r.id, "actual_amount", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2 text-right">{progress}%</td>
                <td className="p-2 text-right">
                  <button onClick={() => deleteRow(r.id)} className="text-red-500">
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={addRow} className="border px-3 py-2 rounded bg-white">
        + Add Debt
      </button>
    </div>
  );
}
