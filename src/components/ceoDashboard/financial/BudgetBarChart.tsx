import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  data: { category: string; budget: number; actual: number }[];
}

const BudgetBarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Budget vs Actual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#60a5fa" />
          <Bar dataKey="actual" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetBarChart;
