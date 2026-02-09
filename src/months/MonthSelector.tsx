import { useState } from "react";
import { Month } from "../hooks/useMonths";

type Props = {
  months: Month[];
  activeMonth: Month | null;
  onChange: (month: Month) => void;
  onCreate: (name: string, date: string) => void;
};

export default function MonthSelector({
  months,
  activeMonth,
  onChange,
  onCreate
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="mb-4 flex items-center gap-4">
      <select
        className="border p-2 rounded"
        value={activeMonth?.id || ""}
        onChange={(e) => {
          const selected = months.find(m => m.id === e.target.value);
          if (selected) onChange(selected);
        }}
      >
        {months.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => setShowForm(!showForm)}
        className="border px-3 py-2 rounded bg-white"
      >
        + New Month
      </button>

      {showForm && (
        <div className="flex gap-2">
          <input
            placeholder="Month name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={() => {
              onCreate(name, date);
              setName("");
              setDate("");
              setShowForm(false);
            }}
            className="bg-primary px-3 py-2 rounded text-white"
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}
