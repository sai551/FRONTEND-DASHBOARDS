import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  data: { month: string; inflow: number; outflow: number }[];
}

const CashFlowChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Cash Flow</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="inflow" stroke="#4ade80" fill="#bbf7d0" />
          <Area type="monotone" dataKey="outflow" stroke="#f87171" fill="#fecaca" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
