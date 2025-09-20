"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface RiskAnalysisChartProps {
  data: { name: string; count: number }[];
}

export function RiskAnalysisChart({ data }: RiskAnalysisChartProps) {
  const chartData = [
    { name: "Low", count: 0, fill: "hsl(var(--chart-2))" },
    { name: "Medium", count: 0, fill: "hsl(var(--chart-4))" },
    { name: "High", count: 0, fill: "hsl(var(--chart-1))" },
  ];

  data.forEach(item => {
    const target = chartData.find(d => d.name === item.name);
    if (target) {
      target.count = item.count;
    }
  });

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
          <YAxis allowDecimals={false} stroke="hsl(var(--foreground))" />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              borderColor: 'hsl(var(--border))' 
            }}
          />
          <Legend />
          <Bar dataKey="count" name="Number of Transactions" fill="fill" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
