import { useBills } from "../hooks/useBills";

type Props = {
  monthId?: string;
};

export default function BillsTable({ monthId }: Props) {
  const {
    rows,
    loading,
    addRow,
    updateRow,
    deleteRow
  } = useBills(monthId);

  if (!monthId) return <p>Select a month</p>;
  if (loading) return <p>Loading bills...</p>;

  return (
    <div>
      <table className="w-full border-collapse mb-3">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Bill</th>
            <th className="text-right p-2">Planned</th>
            <th className="text-right p-2">Actual</th>
            <th className="text-right p-2">Progress</th>
            <th className="p-2"></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            const progress =
              row.planned_amount > 0
                ? Math.round(
                    (row.actual_amount / row.planned_amount) * 100
                  )
                : 0;

            return (
              <tr key={row.id} className="border-b">
                <td className="p-2">
                  <input
                    className="w-full border p-1"
                    value={row.bill_name}
                    onChange={(e) =>
                      updateRow(row.id, "bill_name", e.target.value)
                    }
                  />
                </td>

                <td className="p-2 text-right">
                  <input
                    type="number"
                    className="w-24 border p-1 text-right"
                    value={row.planned_amount}
                    onChange={(e) =>
                      updateRow(
                        row.id,
                        "planned_amount",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>

                <td className="p-2 text-right">
                  <input
                    type="number"
                    className="w-24 border p-1 text-right"
                    value={row.actual_amount}
                    onChange={(e) =>
                      updateRow(
                        row.id,
                        "actual_amount",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>

                <td className="p-2 text-right">{progress}%</td>

                <td className="p-2 text-right">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={addRow}
        className="border px-3 py-2 rounded bg-white"
      >
        + Add Bill
      </button>
    </div>
  );
}
