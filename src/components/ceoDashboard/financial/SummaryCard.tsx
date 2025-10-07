import React from 'react';

interface Props {
  label: string;
  value: number;
  change: number;
  type: 'positive' | 'negative';
}

const SummaryCard: React.FC<Props> = ({ label, value, change, type }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-2xl font-semibold text-gray-800">₹ {value.toLocaleString()}</p>
      <p className={`text-sm ${type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'positive' ? '+' : '-'}{(change * 100).toFixed(1)}%
      </p>
    </div>
  );
};

export default SummaryCard;
