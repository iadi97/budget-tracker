import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type BillRow = {
  id: string;
  bill_name: string;
  planned_amount: number;
  actual_amount: number;
};

export function useBills(monthId?: string) {
  const [rows, setRows] = useState<BillRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    if (!monthId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("month_id", monthId)
      .order("bill_name");

    if (!error && data) {
      setRows(data);
    }

    setLoading(false);
  };

  const addRow = async () => {
    if (!monthId) return;

    await supabase.from("bills").insert({
      month_id: monthId,
      bill_name: "New bill",
      planned_amount: 0,
      actual_amount: 0
    });

    fetchBills();
  };

  const updateRow = async (
    id: string,
    field: string,
    value: string | number
  ) => {
    await supabase
      .from("bills")
      .update({ [field]: value })
      .eq("id", id);

    fetchBills();
  };

  const deleteRow = async (id: string) => {
    await supabase.from("bills").delete().eq("id", id);
    fetchBills();
  };

  useEffect(() => {
    fetchBills();
  }, [monthId]);

  return {
    rows,
    loading,
    addRow,
    updateRow,
    deleteRow
  };
}
