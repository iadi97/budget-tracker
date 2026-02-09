import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import SectionBox from "../components/SectionBox";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />
      <SummaryCards />

      <SectionBox title="Financial Overview">
        <div className="h-32 text-gray-400 flex items-center justify-center">
          Overview table placeholder
        </div>
      </SectionBox>

      <div className="grid grid-cols-3 gap-6">
        <SectionBox title="Amount Left to Spend">
          <div className="h-40 text-gray-400 flex items-center justify-center">
            Donut chart placeholder
          </div>
        </SectionBox>

        <SectionBox title="Cash Flow">
          <div className="h-40 text-gray-400 flex items-center justify-center">
            Bar chart placeholder
          </div>
        </SectionBox>

        <SectionBox title="Allocation Summary">
          <div className="h-40 text-gray-400 flex items-center justify-center">
            Pie chart placeholder
          </div>
        </SectionBox>
      </div>

      <SectionBox title="Income">
        Table placeholder
      </SectionBox>

      <SectionBox title="Bills">
        Table placeholder
      </SectionBox>

      <SectionBox title="Expenses">
        Table placeholder
      </SectionBox>

      <SectionBox title="Savings">
        Table placeholder
      </SectionBox>

      <SectionBox title="Debt">
        Table placeholder
      </SectionBox>
    </div>
  );
}
