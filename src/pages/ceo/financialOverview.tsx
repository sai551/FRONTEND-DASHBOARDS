import React, { useState } from 'react';
import useFinancialData from '../../components/ceoDashboard/financial/financialData';
import SummaryCard from '../../components/ceoDashboard/financial/SummaryCard';
import RevenueChart from '../../components/ceoDashboard/financial/RevenueChart';
import ExpensePieChart from '../../components/ceoDashboard/financial/ExpensePieChart';
import BudgetBarChart from '../../components/ceoDashboard/financial/BudgetBarChart';
import CashFlowChart from '../../components/ceoDashboard/financial/CashFlowChart';
import DateFilter from '../../components/ceoDashboard/financial/DateFilter';
import AccordionReports from '../../components/ceoDashboard/financial/AccordionReports';
import { FiDownload, FiFileText } from 'react-icons/fi';

const FinancialOverview: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('monthly');
  const { data, loading } = useFinancialData(selectedRange);

  if (loading || !data) return <div className="p-6 text-gray-600">Loading financial data...</div>;

  const { revenue, expenses, profit, change, monthlyRevenue, expenseBreakdown, budgetVsActual, cashFlow } = data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">📊 Financial Overview</h2>
        <DateFilter selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
      </div>

      {expenses > revenue && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-md mb-6">
          ⚠️ Warning: Expenses have exceeded Revenue in the selected period!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard label="Total Revenue" value={revenue} change={change.revenue} type="positive" />
        <SummaryCard label="Total Expenses" value={expenses} change={change.expenses} type="negative" />
        <SummaryCard label="Net Profit" value={profit} change={change.profit} type="positive" />
      </div>

      <div className="flex gap-3 mb-6">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <FiDownload /> Export CSV
        </button>
        <button className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition">
          <FiFileText /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart data={monthlyRevenue} />
        <ExpensePieChart data={expenseBreakdown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetBarChart data={budgetVsActual} />
        <CashFlowChart data={cashFlow} />
      </div>

      <AccordionReports />
    </div>
  );
};

export default FinancialOverview;
