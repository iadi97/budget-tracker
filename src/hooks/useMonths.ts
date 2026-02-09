import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Month = {
  id: string;
  name: string;
  month_date: string;
};

export function useMonths() {
  const [months, setMonths] = useState<Month[]>([]);
  const [activeMonth, setActiveMonth] = useState<Month | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMonths = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("months")
      .select("*")
      .order("month_date", { ascending: false });

    if (!error && data) {
      setMonths(data);
      setActiveMonth(data[0] || null);
    }

    setLoading(false);
  };

  const createMonth = async (name: string, date: string) => {
    const { error } = await supabase.from("months").insert({
      name,
      month_date: date
    });

    if (!error) {
      fetchMonths();
    }
  };

  useEffect(() => {
    fetchMonths();
  }, []);

  return {
    months,
    activeMonth,
    setActiveMonth,
    createMonth,
    loading
  };
}
