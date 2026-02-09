import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type DebtRow = {
  id: string;
  debt_name: string;
  planned_amount: number;
  actual_amount: number;
};

export function useDebt(monthId?: string) {
  const [rows, setRows] = useState<DebtRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDebt = async () => {
    if (!monthId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("debt")
      .select("*")
      .eq("month_id", monthId)
      .order("debt_name");

    if (!error && data) setRows(data);
    setLoading(false);
  };

  const addRow = async () => {
    if (!monthId) return;
    await supabase.from("debt").insert({
      month_id: monthId,
      debt_name: "New debt",
      planned_amount: 0,
      actual_amount: 0
    });
    fetchDebt();
  };

  const updateRow = async (id: string, field: string, value: string | number) => {
    await supabase.from("debt").update({ [field]: value }).eq("id", id);
    fetchDebt();
  };

  const deleteRow = async (id: string) => {
    await supabase.from("debt").delete().eq("id", id);
    fetchDebt();
  };

  useEffect(() => {
    fetchDebt();
  }, [monthId]);

  return { rows, loading, addRow, updateRow, deleteRow };
}
