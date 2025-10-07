import { useEffect, useState } from 'react';
import axios from 'axios';

interface FinancialData {
  revenue: number;
  expenses: number;
  profit: number;
  change: {
    revenue: number;
    expenses: number;
    profit: number;
  };
  monthlyRevenue: { month: string; revenue: number }[];
  expenseBreakdown: { name: string; value: number }[];
  budgetVsActual: { category: string; budget: number; actual: number }[];
  cashFlow: { month: string; inflow: number; outflow: number }[];
}

export default function useFinancialData(range: string) {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<FinancialData>(`http://localhost:3000/api/financial-overview?range=${range}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [range]);

  return { data, loading };
}
