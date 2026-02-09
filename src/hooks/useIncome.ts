import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type IncomeRow = {
  id: string;
  source_name: string;
  planned_amount: number;
  actual_amount: number;
};

export function useIncome(monthId?: string) {
  const [rows, setRows] = useState<IncomeRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIncome = async () => {
    if (!monthId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("income")
      .select("*")
      .eq("month_id", monthId)
      .order("source_name");

    if (!error && data) {
      setRows(data);
    }

    setLoading(false);
  };

  const addRow = async () => {
    if (!monthId) return;

    await supabase.from("income").insert({
      month_id: monthId,
      source_name: "New income",
      planned_amount: 0,
      actual_amount: 0
    });

    fetchIncome();
  };

  const updateRow = async (
    id: string,
    field: string,
    value: string | number
  ) => {
    await supabase
      .from("income")
      .update({ [field]: value })
      .eq("id", id);

    fetchIncome();
  };

  const deleteRow = async (id: string) => {
    await supabase.from("income").delete().eq("id", id);
    fetchIncome();
  };

  useEffect(() => {
    fetchIncome();
  }, [monthId]);

  return {
    rows,
    loading,
    addRow,
    updateRow,
    deleteRow
  };
}
