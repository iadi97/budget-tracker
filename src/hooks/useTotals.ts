import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Totals = {
  planned: number;
  actual: number;
};

export type CategoryTotals = {
  income: Totals;
  bills: Totals;
  expenses: Totals;
  savings: Totals;
  debt: Totals;
};

const emptyTotals = { planned: 0, actual: 0 };

export function useTotals(monthId?: string) {
  const [totals, setTotals] = useState<CategoryTotals>({
    income: emptyTotals,
    bills: emptyTotals,
    expenses: emptyTotals,
    savings: emptyTotals,
    debt: emptyTotals
  });

  const sumTable = async (
    table: string,
    monthId: string
  ): Promise<Totals> => {
    const { data } = await supabase
      .from(table)
      .select("planned_amount, actual_amount")
      .eq("month_id", monthId);

    if (!data) return emptyTotals;

    return {
      planned: data.reduce((s, r) => s + Number(r.planned_amount), 0),
      actual: data.reduce((s, r) => s + Number(r.actual_amount), 0)
    };
  };

  useEffect(() => {
    if (!monthId) return;

    (async () => {
      const [income, bills, expenses, savings, debt] = await Promise.all([
        sumTable("income", monthId),
        sumTable("bills", monthId),
        sumTable("expenses", monthId),
        sumTable("savings", monthId),
        sumTable("debt", monthId)
      ]);

      setTotals({ income, bills, expenses, savings, debt });
    })();
  }, [monthId]);

  return totals;
}
