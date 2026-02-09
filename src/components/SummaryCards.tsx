const cards = [
  "Income",
  "Expenses",
  "Bills",
  "Savings",
  "Debt"
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((title) => (
        <div
          key={title}
          className="bg-white border rounded p-4 text-center"
        >
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold">$0.00</p>
        </div>
      ))}
    </div>
  );
}
