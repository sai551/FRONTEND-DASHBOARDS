import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", revenue: 4000, growth: 2 },
  { month: "Feb", revenue: 4600, growth: 4 },
  { month: "Mar", revenue: 4800, growth: 5 },
  { month: "Apr", revenue: 5200, growth: 6 },
  { month: "May", revenue: 5500, growth: 7 },
  { month: "Jun", revenue: 5300, growth: 5 },
  { month: "Jul", revenue: 6000, growth: 8 },
];

export default function Performance() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Company Performance</h1>
      <p className="text-muted-foreground mb-6">
        Overview of revenue trends and monthly growth rates.
      </p>

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue & Growth</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: 'Growth %', angle: -90, position: 'insideRight' }}
              />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                strokeWidth={2}
                name="Revenue"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="growth"
                stroke="#facc15"
                strokeWidth={2}
                name="Growth %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
