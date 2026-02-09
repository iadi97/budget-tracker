import Header from "../components/Header";
import SectionBox from "../components/SectionBox";
import SummaryCards from "../components/SummaryCards";
import FinancialOverview from "../components/FinancialOverview";

import MonthSelector from "../months/MonthSelector";
import { useMonths } from "../hooks/useMonths";
import { useTotals } from "../hooks/useTotals";

import IncomeTable from "../income/IncomeTable";
import BillsTable from "../bills/BillsTable";
import ExpensesTable from "../expenses/ExpensesTable";
import SavingsTable from "../savings/SavingsTable";
import DebtTable from "../debt/DebtTable";

import AmountLeftChart from "../charts/AmountLeftChart";
import CashFlowChart from "../charts/CashFlowChart";
import AllocationChart from "../charts/AllocationChart";

export default function Dashboard() {
  const { months, activeMonth, setActiveMonth, createMonth, loading } =
    useMonths();

  const totals = useTotals(activeMonth?.id);

  const outflowActual =
    totals.bills.actual +
    totals.expenses.actual +
    totals.savings.actual +
    totals.debt.actual;

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />

      <MonthSelector
        months={months}
        activeMonth={activeMonth}
        onChange={setActiveMonth}
        onCreate={createMonth}
      />

      <SummaryCards
        income={totals.income.actual}
        expenses={totals.expenses.actual}
        bills={totals.bills.actual}
        savings={totals.savings.actual}
        debt={totals.debt.actual}
      />

      <SectionBox title="Financial Overview">
        <FinancialOverview
          rows={[
            { label: "Income", ...totals.income },
            { label: "Expenses", ...totals.expenses },
            { label: "Bills", ...totals.bills },
            { label: "Savings", ...totals.savings },
            { label: "Debt", ...totals.debt }
          ]}
        />
      </SectionBox>

      <div className="grid grid-cols-3 gap-6">
        <SectionBox title="Amount Left to Spend">
          <AmountLeftChart
            incomeActual={totals.income.actual}
            outflowActual={outflowActual}
          />
        </SectionBox>

        <SectionBox title="Cash Flow">
          <CashFlowChart totals={totals} />
        </SectionBox>

        <SectionBox title="Allocation Summary">
          <AllocationChart
            expensesActual={totals.expenses.actual}
            billsActual={totals.bills.actual}
            savingsActual={totals.savings.actual}
            debtActual={totals.debt.actual}
          />
        </SectionBox>
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
