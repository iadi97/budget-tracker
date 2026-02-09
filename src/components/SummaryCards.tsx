type Props = {
  income: number;
  expenses: number;
  bills: number;
  savings: number;
  debt: number;
};

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">
        ${value.toFixed(2)}
      </p>
    </div>
  );
}

export default function SummaryCards(props: Props) {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <Card label="Income" value={props.income} />
      <Card label="Expenses" value={props.expenses} />
      <Card label="Bills" value={props.bills} />
      <Card label="Savings" value={props.savings} />
      <Card label="Debt" value={props.debt} />
    </div>
  );
}
