import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import SectionBox from "../components/SectionBox";

import MonthSelector from "../months/MonthSelector";
import { useMonths } from "../hooks/useMonths";

import IncomeTable from "../income/IncomeTable";
import BillsTable from "../bills/BillsTable";
import ExpensesTable from "../expenses/ExpensesTable";
import SavingsTable from "../savings/SavingsTable";
import DebtTable from "../debt/DebtTable";

export default function Dashboard() {
  const { months, activeMonth, setActiveMonth, createMonth, loading } =
    useMonths();

  if (loading) return <div className="p-6">Loading months...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />

      <MonthSelector
        months={months}
        activeMonth={activeMonth}
        onChange={setActiveMonth}
        onCreate={createMonth}
      />

      <SummaryCards />

      <SectionBox title="Financial Overview">
        Overview table coming next
      </SectionBox>

      <div className="grid grid-cols-3 gap-6">
        <SectionBox title="Amount Left to Spend">Chart</SectionBox>
        <SectionBox title="Cash Flow">Chart</SectionBox>
        <SectionBox title="Allocation Summary">Chart</SectionBox>
      </div>

      <SectionBox title="Income">
        <IncomeTable monthId={activeMonth?.id} />
      </SectionBox>

      <SectionBox title="Bills">
        <BillsTable monthId={activeMonth?.id} />
      </SectionBox>

      <SectionBox title="Expenses">
        <ExpensesTable monthId={activeMonth?.id} />
      </SectionBox>

      <SectionBox title="Savings">
        <SavingsTable monthId={activeMonth?.id} />
      </SectionBox>

      <SectionBox title="Debt">
        <DebtTable monthId={activeMonth?.id} />
      </SectionBox>
    </div>
  );
}
