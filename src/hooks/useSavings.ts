import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type SavingRow = {
  id: string;
  goal_name: string;
  planned_amount: number;
  actual_amount: number;
};

export function useSavings(monthId?: string) {
  const [rows, setRows] = useState<SavingRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavings = async () => {
    if (!monthId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("savings")
      .select("*")
      .eq("month_id", monthId)
      .order("goal_name");

    if (!error && data) setRows(data);
    setLoading(false);
  };

  const addRow = async () => {
    if (!monthId) return;
    await supabase.from("savings").insert({
      month_id: monthId,
      goal_name: "New goal",
      planned_amount: 0,
      actual_amount: 0
    });
    fetchSavings();
  };

  const updateRow = async (id: string, field: string, value: string | number) => {
    await supabase.from("savings").update({ [field]: value }).eq("id", id);
    fetchSavings();
  };

  const deleteRow = async (id: string) => {
    await supabase.from("savings").delete().eq("id", id);
    fetchSavings();
  };

  useEffect(() => {
    fetchSavings();
  }, [monthId]);

  return { rows, loading, addRow, updateRow, deleteRow };
}
