import React from 'react';

interface Props {
  selectedRange: string;
  setSelectedRange: (value: string) => void;
}

const DateFilter: React.FC<Props> = ({ selectedRange, setSelectedRange }) => {
  return (
    <select
      value={selectedRange}
      onChange={(e) => setSelectedRange(e.target.value)}
      className="border border-gray-300 px-3 py-2 rounded-md"
    >
      <option value="monthly">Monthly</option>
      <option value="quarterly">Quarterly</option>
      <option value="yearly">Yearly</option>
    </select>
  );
};

export default DateFilter;
