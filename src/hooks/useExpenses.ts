import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type ExpenseRow = {
  id: string;
  category_name: string;
  planned_amount: number;
  actual_amount: number;
};

export function useExpenses(monthId?: string) {
  const [rows, setRows] = useState<ExpenseRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    if (!monthId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("month_id", monthId)
      .order("category_name");

    if (!error && data) setRows(data);
    setLoading(false);
  };

  const addRow = async () => {
    if (!monthId) return;
    await supabase.from("expenses").insert({
      month_id: monthId,
      category_name: "New expense",
      planned_amount: 0,
      actual_amount: 0
    });
    fetchExpenses();
  };

  const updateRow = async (id: string, field: string, value: string | number) => {
    await supabase.from("expenses").update({ [field]: value }).eq("id", id);
    fetchExpenses();
  };

  const deleteRow = async (id: string) => {
    await supabase.from("expenses").delete().eq("id", id);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, [monthId]);

  return { rows, loading, addRow, updateRow, deleteRow };
}
