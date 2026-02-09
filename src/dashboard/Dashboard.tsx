import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import SectionBox from "../components/SectionBox";
import MonthSelector from "../months/MonthSelector";
import { useMonths } from "../hooks/useMonths";

export default function Dashboard() {
  const {
    months,
    activeMonth,
    setActiveMonth,
    createMonth,
    loading
  } = useMonths();

  if (loading) {
    return <div className="p-6">Loading months...</div>;
  }

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
        Overview table placeholder
      </SectionBox>

      <div className="grid grid-cols-3 gap-6">
        <SectionBox title="Amount Left to Spend">Donut chart</SectionBox>
        <SectionBox title="Cash Flow">Bar chart</SectionBox>
        <SectionBox title="Allocation Summary">Pie chart</SectionBox>
      </div>

      <SectionBox title="Income" />
      <SectionBox title="Bills" />
      <SectionBox title="Expenses" />
      <SectionBox title="Savings" />
      <SectionBox title="Debt" />
    </div>
  );
}
